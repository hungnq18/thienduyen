import { BookOpen, Bot, Calendar, Heart, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import mascotDuyen from '../assets/mascot-duyen.png';
import mascotThien from '../assets/mascot-thien.png';
import popUpChat from '../assets/pop-up-chat.png';
import chatService from '../services/chatService';
import {
  calculateConceptScore,
  chuaQuestions,
  conceptDescriptions,
  knowledgeQuestions,
  resortQuestions
} from '../utils/chatbotLogic';

// Import logo và mascot images
// Thêm các file sau vào thư mục assets hoặc public:
// - logo-thien.png/svg (logo Thiện)
// - logo-duyen.png/svg (logo Duyên)
// - mascot-duyen.png (ảnh mascot Duyên) 
// - mascot-thien.png (ảnh mascot Thiện)

// Logo Thiện và Duyên - đặt trong frontend/public/ hoặc frontend/src/assets/
const logoThienPath = '/logo-thien.png'; // Hoặc '/src/assets/logo-thien.png'
const logoDuyenPath = '/logo-duyen.png'; // Hoặc '/src/assets/logo-duyen.png'

// Mascot images
const mascotDuyenPath = '/mascot-duyen.png'; // Đặt ảnh trong frontend/public/
const mascotThienPath = '/mascot-thien.png'; // Đặt ảnh trong frontend/public/

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Chào hai bạn 💛\n\nMình là Thiện Duyên, người đồng hành cùng các cặp đôi trên hành trình tổ chức Lễ Hằng Thuận – nghi lễ cưới Phật giáo đầy ý nghĩa. Bạn muốn mình giúp gì hôm nay ạ?',
      sender: 'bot',
      timestamp: new Date(),
      showQuickReplies: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // State cho tư vấn concept
  const [conversationFlow, setConversationFlow] = useState(null); // 'knowledge', 'concept', 'booking'
  const [locationType, setLocationType] = useState(null); // 'chua', 'resort'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [conceptAnswers, setConceptAnswers] = useState([]);

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

  // Call ChatGPT API
  const getAIResponse = async (userMessage, conversationHistory) => {
    try {
      setError(null);
      const botText = await chatService.sendMessage(userMessage, conversationHistory);
      return botText;
    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Handle network errors (server not running or connection failed)
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error') || !error.response) {
        throw new Error('Không thể kết nối đến server. Vui lòng đảm bảo backend server đang chạy trên port 5000.');
      }
      
      // Handle different error cases
      if (error.response?.status === 404) {
        throw new Error('API endpoint không tìm thấy. Vui lòng kiểm tra lại cấu hình server.');
      }
      
      if (error.response?.status === 500 && error.response?.data?.message?.includes('API key')) {
        return 'Xin lỗi, dịch vụ AI hiện đang được cấu hình. Vui lòng liên hệ với chúng tôi qua trang Contact để được hỗ trợ trực tiếp.';
      }
      
      if (error.response?.data?.message) {
        return `Xin lỗi, đã có lỗi xảy ra: ${error.response.data.message}. Vui lòng thử lại sau.`;
      }
      
      if (error.message) {
        return `Xin lỗi, đã có lỗi xảy ra: ${error.message}. Vui lòng thử lại sau.`;
      }
      
      return 'Xin lỗi, đã có lỗi xảy ra khi kết nối với dịch vụ AI. Vui lòng thử lại sau hoặc liên hệ với chúng tôi qua trang Contact.';
    }
  };

  const handleQuickReply = async (replyText) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: replyText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => prev.map(msg => 
      msg.id === 1 ? { ...msg, showQuickReplies: false } : msg
    ).concat([userMessage]));

    // Xử lý các quick reply khác nhau
    if (replyText === 'Tư vấn chọn concept cá nhân hóa') {
      setConversationFlow('concept');
      setLocationType(null);
      setCurrentQuestionIndex(0);
      setConceptAnswers([]);
      
      // Hiển thị câu hỏi đầu tiên về địa điểm
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: 'Trước khi Duyên gợi ý concept phù hợp, cho Duyên hỏi nhẹ vài điều nha 💬\n\nCâu 1: Hai bạn mong muốn tổ chức lễ ở đâu nè?',
          sender: 'bot',
          timestamp: new Date(),
          showQuestionOptions: true,
          questionType: 'location',
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
      return;
    }

    if (replyText === 'Tìm hiểu về ý nghĩa Lễ Hằng Thuận & về Thiện Duyên') {
      setConversationFlow('knowledge');
      // Hiển thị danh sách câu hỏi
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: 'Duyên rất vui được chia sẻ với hai bạn về Lễ Hằng Thuận và Thiện Duyên 🌿\n\nBạn muốn tìm hiểu về điều gì nhỉ?',
          sender: 'bot',
          timestamp: new Date(),
          showKnowledgeOptions: true,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
      return;
    }

    if (replyText === 'Đặt lịch hẹn tư vấn cùng chuyên viên') {
      setConversationFlow('booking');
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: 'Tuyệt vời! Duyên sẽ giúp bạn đặt lịch hẹn tư vấn cùng chuyên viên 💛\n\nBạn vui lòng để lại thông tin liên hệ hoặc truy cập trang Liên hệ trên website để chúng tôi có thể sắp xếp lịch phù hợp nhất nhé 🌸',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
      return;
    }

    // Xử lý các reply khác bằng AI
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      const conversationHistory = (messages || [])
        .filter(msg => msg && (msg.sender !== 'bot' || msg.id !== 1))
        .map(msg => ({
          sender: msg.sender,
          text: msg.text,
        }));

      const botResponseText = await getAIResponse(replyText, conversationHistory);

      if (!botResponseText) {
        throw new Error('Không nhận được phản hồi từ server');
      }

      setMessages((prev) => {
        const newId = (prev?.length || 0) + 2;
        return [
          ...(prev || []),
          {
            id: newId,
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date(),
          }
        ];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(errorMessage);
      
      setMessages((prev) => {
        const newId = (prev?.length || 0) + 2;
        return [
          ...(prev || []),
          {
            id: newId,
            text: errorMessage.includes('API endpoint') || errorMessage.includes('kết nối') 
              ? errorMessage 
              : 'Xin lỗi, đã có lỗi xảy ra khi xử lý tin nhắn của bạn. Vui lòng thử lại sau hoặc liên hệ với chúng tôi qua trang Contact.',
            sender: 'bot',
            timestamp: new Date(),
          }
        ];
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Xử lý chọn địa điểm
  const handleLocationSelect = (location) => {
    const locationText = location === 'chua' ? 'Tại chùa truyền thống' : 'Tại resort hoặc khu nghỉ dưỡng';
    
    const userMessage = {
      id: messages.length + 1,
      text: locationText,
      sender: 'user',
      timestamp: new Date(),
    };

    setLocationType(location);
    setCurrentQuestionIndex(0);
    setConceptAnswers([]);

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const responseText = location === 'chua' 
        ? 'Tuyệt vời 🌿 Lễ tổ chức tại chùa sẽ giữ trọn tinh thần Phật giáo và không khí tôn nghiêm.\n\nCho mình hỏi thêm vài điều để gợi ý concept phù hợp nhất nhé 💬'
        : 'Thật tuyệt 🌺 Lễ Hằng Thuận tại resort là xu hướng mới – vừa thanh tịnh, vừa gần gũi thiên nhiên, mang hơi thở Phật giáo hiện đại. Mình hỏi thêm vài điều nhé:';

      const questions = location === 'chua' ? chuaQuestions : resortQuestions;
      const firstQuestion = questions[0];

      const botMessage = {
        id: messages.length + 2,
        text: responseText + '\n\n' + firstQuestion.question,
        sender: 'bot',
        timestamp: new Date(),
        showQuestionOptions: true,
        questionType: 'concept',
        questionData: firstQuestion,
        questionIndex: 0,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  // Xử lý chọn đáp án câu hỏi concept
  const handleConceptAnswer = (option, questionData, questionIndex) => {
    const userMessage = {
      id: messages.length + 1,
      text: option.text,
      sender: 'user',
      timestamp: new Date(),
    };

    const newAnswers = [...conceptAnswers, option];
    setConceptAnswers(newAnswers);

    setMessages((prev) => [...prev, userMessage]);

    const questions = locationType === 'chua' ? chuaQuestions : resortQuestions;
    const nextIndex = questionIndex + 1;

    if (nextIndex < questions.length) {
      // Hiển thị câu hỏi tiếp theo
      setTimeout(() => {
        const nextQuestion = questions[nextIndex];
        const botMessage = {
          id: messages.length + 2,
          text: nextQuestion.question,
          sender: 'bot',
          timestamp: new Date(),
          showQuestionOptions: true,
          questionType: 'concept',
          questionData: nextQuestion,
          questionIndex: nextIndex,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    } else {
      // Tính điểm và hiển thị kết quả
      setTimeout(() => {
        const result = calculateConceptScore(newAnswers, locationType);
        const conceptDesc = conceptDescriptions[result.topConcept];
        
        let resultText = `Có vẻ hai bạn mang năng lượng ${result.topConcept} nhiều nhất đó 💕\n\n`;
        resultText += `Duyên gợi ý Concept ${conceptDesc.name} – phù hợp với tâm thế và gu thẩm mỹ của hai bạn.\n\n`;
        resultText += `🌿 ${conceptDesc.description}\n\n`;
        resultText += `Màu sắc: ${conceptDesc.colors}\n`;
        resultText += `Không khí: ${conceptDesc.mood}`;

        const botMessage = {
          id: messages.length + 2,
          text: resultText,
          sender: 'bot',
          timestamp: new Date(),
          showConceptResult: true,
          conceptName: result.topConcept,
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    }
  };

  // Xử lý chọn câu hỏi kiến thức
  const handleKnowledgeSelect = (questionKey) => {
    const question = knowledgeQuestions[questionKey];
    if (!question) return;

    const userMessage = {
      id: messages.length + 1,
      text: question.question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: question.answer,
        sender: 'bot',
        timestamp: new Date(),
        showKnowledgeOptions: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const currentMessage = inputMessage.trim();
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: currentMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => prev.map(msg => 
      msg.id === 1 ? { ...msg, showQuickReplies: false } : msg
    ).concat([userMessage]));
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Prepare conversation history (exclude system message and current message)
      const conversationHistory = (messages || [])
        .filter(msg => msg && (msg.sender !== 'bot' || msg.id !== 1)) // Exclude initial greeting
        .map(msg => ({
          sender: msg.sender,
          text: msg.text,
        }));

      // Call API
      const botResponseText = await getAIResponse(currentMessage, conversationHistory);

      if (!botResponseText) {
        throw new Error('Không nhận được phản hồi từ server');
      }

      setMessages((prev) => {
        const newId = (prev?.length || 0) + 2;
        return [
          ...(prev || []),
          {
            id: newId,
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date(),
          }
        ];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(errorMessage);
      
      setMessages((prev) => {
        const newId = (prev?.length || 0) + 2;
        return [
          ...(prev || []),
          {
            id: newId,
            text: errorMessage.includes('API endpoint') || errorMessage.includes('kết nối') 
              ? errorMessage 
              : 'Xin lỗi, đã có lỗi xảy ra khi xử lý tin nhắn của bạn. Vui lòng thử lại sau hoặc liên hệ với chúng tôi qua trang Contact.',
            sender: 'bot',
            timestamp: new Date(),
          }
        ];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Kiểm tra xem message có phải là của Duyên không
  const isDuyenMessage = (message) => {
    if (message.sender !== 'bot') return false;
    
    // Kiểm tra text có chứa "Duyên" không
    if (message.text && message.text.toLowerCase().includes('duyên')) {
      return true;
    }
    
    // Kiểm tra conversationFlow
    if (conversationFlow === 'concept' || conversationFlow === 'booking') {
      return true;
    }
    
    // Kiểm tra các message liên quan đến concept
    if (message.showQuestionOptions || message.showConceptResult) {
      return true;
    }
    
    return false;
  };

  // Kiểm tra xem message có phải là của Thiện không
  const isThienMessage = (message) => {
    if (message.sender !== 'bot') return false;
    
    // Nếu là message đầu tiên (greeting), không hiển thị mascot
    if (message.id === 1) return false;
    
    // Nếu là message của Duyên, không phải Thiện
    if (isDuyenMessage(message)) return false;
    
    // Kiểm tra text có chứa "Thiện" không
    if (message.text && message.text.toLowerCase().includes('thiện')) {
      return true;
    }
    
    // Kiểm tra conversationFlow là knowledge (tìm hiểu về Lễ Hằng Thuận)
    if (conversationFlow === 'knowledge') {
      return true;
    }
    
    // Các message AI response khác (không phải Duyên) là của Thiện
    return true;
  };

  // Lấy tên nhân vật cho message
  const getCharacterName = (message) => {
    if (message.sender !== 'bot' || message.id === 1) {
      return null; // Không thêm prefix cho message đầu tiên
    }
    
    if (isDuyenMessage(message)) {
      return 'Duyên';
    }
    
    if (isThienMessage(message)) {
      return 'Thiện';
    }
    
    return null;
  };

  // Định dạng text với tên nhân vật
  const formatMessageText = (message) => {
    const characterName = getCharacterName(message);
    if (characterName) {
      return `${characterName} giải đáp thắc mắc cho bạn nha:\n${message.text}`;
    }
    return message.text;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 rounded-full transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'w-12 h-12 bg-[#610912] text-[#F8FBF2] rotate-180 flex items-center justify-center shadow-lg'
            : 'w-14 h-14 hover:scale-110'
        }`}
        aria-label="Toggle ChatBot"
        style={!isOpen ? { boxShadow: 'none', background: 'transparent' } : {}}
      >
        {isOpen ? (
          <X size={20} className="text-[#F8FBF2]" />
        ) : (
          <img 
            src={popUpChat} 
            alt="Thiện Duyên Chat" 
            className="rounded-full mix-blend-multiply block w-full h-full object-cover"
            style={{ backgroundColor: 'transparent', maxWidth: '56px', maxHeight: '56px', width: '56px', height: '56px' }}
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[320px] h-[450px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 animate-chatBotSlideIn" style={{ position: 'fixed', zIndex: 50, width: '320px', height: '450px', maxWidth: '320px', maxHeight: '450px' }}>
          {/* Header */}
          <div className="bg-[#610912] text-[#F8FBF2] px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Logo Thiện và Duyên */}
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  <img 
                    src={logoThienPath}
                    alt="Thiện" 
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <img 
                    src={logoDuyenPath}
                    alt="Duyên" 
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                {/* Fallback icon nếu logo không tải được */}
                <div className="w-10 h-10 rounded-full bg-[#F8FBF2] flex items-center justify-center">
                  <Bot size={20} className="text-[#610912]" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Thiện Duyên</h3>
                <p className="text-xs text-[#F8FBF2]/80">Lễ Hằng Thuận</p>
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
              <div key={message.id}>
                <div
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && message.id === 1 && (
                    <div className="w-12 h-12 rounded-full mr-2 mb-2 overflow-hidden p-0 bg-transparent">
                      <img 
                        src={popUpChat} 
                        alt="Thiện Duyên Chat" 
                        className="w-full h-full object-cover rounded-full mix-blend-multiply"
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </div>
                  )}
                  {message.sender === 'bot' && message.id !== 1 && isDuyenMessage(message) && (
                    <div className="w-6 h-6 rounded-full mr-2 mb-2 overflow-hidden flex-shrink-0 self-end">
                      <img 
                        src={mascotDuyen} 
                        alt="Duyên" 
                        className="w-full h-full object-cover rounded-full"
                        style={{ maxWidth: '24px', maxHeight: '24px', width: '24px', height: '24px' }}
                      />
                    </div>
                  )}
                  {message.sender === 'bot' && message.id !== 1 && isThienMessage(message) && (
                    <div className="w-6 h-6 rounded-full mr-2 mb-2 overflow-hidden flex-shrink-0 self-end">
                      <img 
                        src={mascotThien} 
                        alt="Thiện" 
                        className="w-full h-full object-cover rounded-full"
                        style={{ maxWidth: '24px', maxHeight: '24px', width: '24px', height: '24px' }}
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[#610912] text-[#F8FBF2] rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{formatMessageText(message)}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-[#F8FBF2]/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
                
                {/* Quick Reply Buttons */}
                {message.showQuickReplies && message.sender === 'bot' && (
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => handleQuickReply('Tư vấn chọn concept cá nhân hóa')}
                      className="w-full bg-white border-2 border-[#ECA9BE] hover:bg-[#ECA9BE] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <Heart size={18} className="text-[#ECA9BE] group-hover:text-white" />
                        Tư vấn chọn concept cá nhân hóa
                      </span>
                      <div className="flex items-center gap-1">
                        <img 
                          src={logoDuyenPath}
                          alt="Duyên" 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <img 
                          src={mascotDuyenPath}
                          alt="Duyên" 
                          className="w-4 h-4 rounded-full object-cover border border-[#ECA9BE]"
                          style={{ maxWidth: '16px', maxHeight: '16px', width: '16px', height: '16px' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <span className="text-xs text-[#ECA9BE] group-hover:text-white">Duyên</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleQuickReply('Tìm hiểu về ý nghĩa Lễ Hằng Thuận & về Thiện Duyên')}
                      className="w-full bg-white border-2 border-[#610912] hover:bg-[#610912] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen size={18} className="text-[#610912] group-hover:text-white" />
                        Tìm hiểu về ý nghĩa Lễ Hằng Thuận & về Thiện Duyên
                      </span>
                      <div className="flex items-center gap-1">
                        <img 
                          src={logoThienPath}
                          alt="Thiện" 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <img 
                          src={mascotThienPath}
                          alt="Thiện" 
                          className="w-4 h-4 rounded-full object-cover border border-[#610912]"
                          style={{ maxWidth: '16px', maxHeight: '16px', width: '16px', height: '16px' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <span className="text-xs text-[#610912] group-hover:text-white">Thiện</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleQuickReply('Đặt lịch hẹn tư vấn cùng chuyên viên')}
                      className="w-full bg-white border-2 border-[#ECA9BE] hover:bg-[#ECA9BE] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar size={18} className="text-[#ECA9BE] group-hover:text-white" />
                        Đặt lịch hẹn tư vấn cùng chuyên viên
                      </span>
                      <div className="flex items-center gap-1">
                        <img 
                          src={logoDuyenPath}
                          alt="Duyên" 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <img 
                          src={mascotDuyenPath}
                          alt="Duyên" 
                          className="w-4 h-4 rounded-full object-cover border border-[#ECA9BE]"
                          style={{ maxWidth: '16px', maxHeight: '16px', width: '16px', height: '16px' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <span className="text-xs text-[#ECA9BE] group-hover:text-white">Duyên</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Location Selection Options */}
                {message.showQuestionOptions && message.questionType === 'location' && (
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => handleLocationSelect('chua')}
                      className="w-full bg-white border-2 border-[#610912] hover:bg-[#610912] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 text-left"
                    >
                      Tại chùa truyền thống
                    </button>
                    <button
                      onClick={() => handleLocationSelect('resort')}
                      className="w-full bg-white border-2 border-[#610912] hover:bg-[#610912] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 text-left"
                    >
                      Tại resort hoặc khu nghỉ dưỡng
                    </button>
                  </div>
                )}

                {/* Concept Question Options */}
                {message.showQuestionOptions && message.questionType === 'concept' && message.questionData && (
                  <div className="mt-3 space-y-2">
                    {message.questionData.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleConceptAnswer(option, message.questionData, message.questionIndex)}
                        className="w-full bg-white border-2 border-[#610912] hover:bg-[#610912] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 text-left"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}

                {/* Knowledge Questions Options */}
                {message.showKnowledgeOptions && message.sender === 'bot' && (
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {Object.keys(knowledgeQuestions).slice(0, 8).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleKnowledgeSelect(key)}
                        className="w-full bg-white border-2 border-[#610912] hover:bg-[#610912] hover:text-white text-gray-800 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 text-left"
                      >
                        {knowledgeQuestions[key].question}
                      </button>
                    ))}
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Có thể hỏi thêm các câu hỏi khác bằng cách nhập trực tiếp 💬
                    </p>
                  </div>
                )}

                {/* Concept Result Actions */}
                {message.showConceptResult && message.sender === 'bot' && (
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => handleQuickReply('Có, gửi cho mình nhé 💌')}
                      className="w-full bg-white border-2 border-[#ECA9BE] hover:bg-[#ECA9BE] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
                    >
                      Có, gửi cho mình nhé 💌
                    </button>
                    <button
                      onClick={() => handleQuickReply('Mình muốn xem thêm concept khác')}
                      className="w-full bg-white border-2 border-[#610912] hover:bg-[#610912] hover:text-white text-gray-800 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
                    >
                      Mình muốn xem thêm concept khác
                    </button>
                  </div>
                )}
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
            {error && (
              <p className="text-xs text-red-500 mt-2 text-center">
                {error}
              </p>
            )}
            {!error && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Trợ lý AI sẽ trả lời trong vài giây...
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;

