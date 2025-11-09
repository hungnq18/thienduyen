import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Chào hai bạn 💛'
      + 'Mình là Thiện Duyên, người đồng hành cùng các cặp đôi trên hành trình tổ chức Lễ Hằng Thuận – nghi lễ cưới Phật giáo đầy ý nghĩa.  Bạn muốn mình giúp gì hôm nay ạ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Mock AI responses based on keywords
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('xin chào') || message.includes('chào') || message.includes('hello') || message.includes('hi')) {
      return 'Xin chào! Rất vui được hỗ trợ bạn. Bạn muốn tìm hiểu về dịch vụ nào của Hằng Thuận?';
    }
    
    // Services
    if (message.includes('dịch vụ') || message.includes('service')) {
      return 'Hằng Thuận cung cấp các dịch vụ:\n• Lên kế hoạch tổ chức lễ cưới\n• Thiết kế và trang trí\n• Điều phối ngày cưới\n\nBạn quan tâm đến dịch vụ nào?';
    }
    
    // Pricing
    if (message.includes('giá') || message.includes('chi phí') || message.includes('price') || message.includes('cost')) {
      return 'Chúng tôi có nhiều gói dịch vụ phù hợp với ngân sách khác nhau. Để được tư vấn chi tiết về giá, bạn vui lòng liên hệ trực tiếp hoặc điền form báo giá tại trang Quotation.';
    }
    
    // Planning
    if (message.includes('kế hoạch') || message.includes('planning') || message.includes('tổ chức')) {
      return 'Dịch vụ lên kế hoạch của chúng tôi bao gồm:\n• Tư vấn và thiết kế kịch bản lễ cưới\n• Quản lý timeline chi tiết\n• Phối hợp với các nhà cung cấp\n• Hỗ trợ từ A-Z trong quá trình chuẩn bị';
    }
    
    // Decoration
    if (message.includes('trang trí') || message.includes('decoration') || message.includes('thiết kế')) {
      return 'Dịch vụ trang trí của Hằng Thuận:\n• Thiết kế không gian lễ đường độc đáo\n• Trang trí theo phong cách truyền thống hoặc hiện đại\n• Sử dụng vật liệu cao cấp, thân thiện môi trường\n• Tùy chỉnh theo sở thích và ngân sách của bạn';
    }
    
    // Coordinator
    if (message.includes('điều phối') || message.includes('coordinator') || message.includes('quản lý')) {
      return 'Dịch vụ điều phối ngày cưới:\n• Quản lý toàn bộ quy trình trong ngày cưới\n• Đảm bảo mọi thứ diễn ra đúng kế hoạch\n• Xử lý các tình huống phát sinh\n• Giúp bạn và gia đình thư giãn, tận hưởng ngày vui';
    }
    
    // Contact
    if (message.includes('liên hệ') || message.includes('contact') || message.includes('số điện thoại') || message.includes('email')) {
      return 'Bạn có thể liên hệ với chúng tôi qua:\n• Trang Contact trên website\n• Email: info@thienduyen.com\n• Hotline: 1900-xxxx\n\nHoặc để lại thông tin, chúng tôi sẽ liên hệ lại sớm nhất!';
    }
    
    // About
    if (message.includes('về') || message.includes('about') || message.includes('giới thiệu')) {
      return 'Hằng Thuận là dịch vụ tổ chức lễ cưới trang nghiêm, tinh tế và giàu ý nghĩa. Chúng tôi chuyên về nghi thức cưới truyền thống, kết hợp với không gian hiện đại, tạo nên những khoảnh khắc đáng nhớ cho cặp đôi và gia đình.';
    }
    
    // Blog
    if (message.includes('blog') || message.includes('bài viết') || message.includes('tin tức')) {
      return 'Bạn có thể xem các bài viết về lễ cưới, kinh nghiệm tổ chức, và câu chuyện của các cặp đôi tại trang Blog của chúng tôi.';
    }
    
    // Thank you
    if (message.includes('cảm ơn') || message.includes('thank') || message.includes('thanks')) {
      return 'Không có gì! Rất vui được hỗ trợ bạn. Nếu có thêm câu hỏi nào, đừng ngần ngại hỏi tôi nhé!';
    }
    
    // Default response
    return 'Cảm ơn bạn đã quan tâm! Tôi có thể giúp bạn về:\n• Thông tin dịch vụ\n• Giá cả và gói dịch vụ\n• Quy trình tổ chức\n• Liên hệ và đặt lịch\n\nBạn muốn biết thêm về điều gì?';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'bg-[#610912] text-[#F8FBF2] rotate-180'
            : 'bg-[#610912] text-[#F8FBF2] hover:bg-[#7a0f18] hover:scale-110'
        }`}
        aria-label="Toggle ChatBot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 animate-chatBotSlideIn">
          {/* Header */}
          <div className="bg-[#610912] text-[#F8FBF2] px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F8FBF2] flex items-center justify-center">
                <Bot size={20} className="text-[#610912]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Trợ lý AI</h3>
                <p className="text-xs text-[#F8FBF2]/80">Thiện Duyên - Hằng Thuận</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#F8FBF2] hover:text-[#E8C585] transition-colors"
              aria-label="Close ChatBot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#FDF6EE] space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#610912] text-[#F8FBF2] rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-[#F8FBF2]/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg px-4 py-2 rounded-bl-none border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610912] focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-[#610912] text-[#F8FBF2] px-4 py-2 rounded-lg hover:bg-[#7a0f18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send Message"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Trợ lý AI sẽ trả lời trong vài giây...
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;

