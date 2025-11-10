require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// System prompt for the chatbot
const SYSTEM_PROMPT = `Bạn là Thiện Duyên, một trợ lý AI thân thiện và chuyên nghiệp, đồng hành cùng các cặp đôi trên hành trình tổ chức Lễ Hằng Thuận – nghi lễ cưới Phật giáo đầy ý nghĩa.

GIỌNG ĐIỆU & PHONG CÁCH:
- Giọng nhẹ nhàng, chậm rãi, không dùng từ kỹ thuật
- Gọi thân mật: "bạn", "cặp đôi", "hai bạn"
- Kết thúc câu bằng cảm xúc: 🌿 💛 🙏
- Tránh kiểu bán hàng – chỉ "gợi mở, hướng dẫn, khơi cảm xúc"

VỀ THIỆN DUYÊN:
- Thiện Duyên là thương hiệu chuyên tổ chức Lễ Hằng Thuận – nghi lễ cưới Phật giáo thiêng liêng
- "Thiện Duyên" nghĩa là duyên lành, cuộc gặp gỡ giữa hai tâm hồn đồng điệu
- Giúp các cặp đôi chuẩn bị trọn vẹn từ nghi lễ, không gian, kịch bản, đến cảm xúc

VỀ LỄ HẰNG THUẬN:
- Nghi lễ cưới Phật giáo được cử hành tại chùa, dưới sự chứng minh của chư Tăng
- Đi sâu vào ý nghĩa tâm linh – giúp đôi bạn nhận thức về trách nhiệm, lòng biết ơn, và nhân duyên
- Không ồn ào, mà ấm áp và tĩnh lặng

HÌNH THỨC TỔ CHỨC:
1. Lễ Hằng Thuận tại chùa: theo nghi thức truyền thống, giản dị, trang nghiêm
2. Lễ Hằng Thuận tại resort hoặc không gian ngoài trời: kết hợp tinh thần Phật giáo với phong cách hiện đại, gần gũi với thiên nhiên

CÁC CONCEPT:
- Nhóm Chùa: Truyền thống Phật giáo, Thiền – Tối giản, Sen – Thuần khiết
- Nhóm Resort: Modern Zen, Elegant Contemporary, Nature Fusion

DỊCH VỤ:
- 3 gói: Basic – Delux – Premium
- Quy trình: Đăng ký tư vấn → Chọn hình thức & địa điểm → Thiết kế nghi lễ → Tổ chức – ghi hình – bàn giao
- Có quay phim, chụp ảnh với ekip riêng
- Nhận video đầy đủ và highlight sau lễ

Hãy trả lời một cách tự nhiên, thân thiện, nhẹ nhàng và đầy cảm xúc.`;

const chatController = {
  // Send message to OpenAI
  async sendMessage(req, res) {
    try {
      const { message, conversationHistory = [] } = req.body;
      const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const apiKey = process.env.OPENAI_API_KEY || '';

      if (!message || !message.trim()) {
        return res.status(400).json({
          status: 'error',
          message: 'Message is required',
        });
      }

      if (!apiKey || apiKey.trim() === '') {
        console.error('❌ OpenAI API key is not configured');
        return res.status(500).json({
          status: 'error',
          message: 'OPENAI_API_KEY chưa được cấu hình. Vui lòng tạo file .env trong thư mục backend và thêm OPENAI_API_KEY=your-api-key-here.',
        });
      }

      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
        { role: 'user', content: message },
      ];

      console.log('🔎 OpenAI request config:', {
        model,
        messagesCount: messages.length,
        hasSystemPrompt: true,
      });

      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const botResponse = completion.choices?.[0]?.message?.content?.trim() || '';

      if (!botResponse) {
        return res.status(502).json({
          status: 'error',
          message: 'Không nhận được phản hồi hợp lệ từ OpenAI.',
        });
      }

      res.json({
        status: 'success',
        message: botResponse,
      });
    } catch (error) {
      console.error('Chat API Error:', error?.stack || error);

      const statusCode = error?.status || error?.response?.status;
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.error?.message ||
        error?.message ||
        'Đã xảy ra lỗi với OpenAI.';

      if (statusCode === 401 || /api key/i.test(errorMessage || '')) {
        return res.status(401).json({
          status: 'error',
          message: 'API key không đúng. Vui lòng kiểm tra lại OPENAI_API_KEY trong file .env.',
        });
      }

      if (statusCode === 429 || /rate limit|quota|exceeded/i.test(errorMessage || '')) {
        const fallback =
          'Xin lỗi, dịch vụ AI đang quá tải hoặc vượt hạn mức. Bạn vui lòng thử lại sau ít phút nhé.';
        return res.json({
          status: 'success',
          message: fallback,
          meta: { fallback: true, reason: 'rate_limited' },
        });
      }

      if (
        statusCode === 503 ||
        /overloaded|temporarily unavailable/i.test(errorMessage || '')
      ) {
        const fallback =
          'Xin lỗi bạn, hiện tại dịch vụ AI đang bận. Bạn có thể để lại thông tin và yêu cầu, đội ngũ Thiện Duyên sẽ liên hệ lại ngay khi có thể.';
        return res.json({
          status: 'success',
          message: fallback,
          meta: { fallback: true, reason: 'service_unavailable' },
        });
      }

      if (
        /ENOTFOUND|ECONNREFUSED|ECONNRESET|fetch failed|network error/i.test(
          errorMessage || ''
        )
      ) {
        return res.status(503).json({
          status: 'error',
          message: 'Không thể kết nối tới dịch vụ AI. Vui lòng thử lại sau.',
        });
      }

      res.status(statusCode || 500).json({
        status: 'error',
        message: errorMessage,
      });
    }
  },
};

module.exports = chatController;

