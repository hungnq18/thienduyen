import api from './api';

class ChatService {
  // Send message to chat API and return bot response text
  async sendMessage(userMessage, conversationHistory = []) {
    try {
      const response = await api.post('/chat/message', {
        message: userMessage,
        conversationHistory: conversationHistory,
      });

      if (response.data?.status === 'success') {
        return response.data.message;
      }

      throw new Error(response.data?.message || 'Failed to get AI response');
    } catch (error) {
      // Network or server not reachable
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error') || !error.response) {
        throw new Error('Không thể kết nối đến server. Vui lòng đảm bảo backend server đang chạy trên port 5000.');
      }

      // Not found
      if (error.response?.status === 404) {
        throw new Error('API endpoint không tìm thấy. Vui lòng kiểm tra lại cấu hình server.');
      }

      // OpenAI key misconfig
      if (error.response?.status === 500 && error.response?.data?.message?.includes('API key')) {
        return 'Xin lỗi, dịch vụ AI hiện đang được cấu hình. Vui lòng liên hệ với chúng tôi qua trang Contact để được hỗ trợ trực tiếp.';
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      throw new Error(error.message || 'Đã có lỗi xảy ra khi kết nối với dịch vụ AI.');
    }
  }
}

export default new ChatService();


