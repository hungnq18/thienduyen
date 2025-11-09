import { useNavigate } from 'react-router-dom';

const SimpleConceptSection = () => {
  const navigate = useNavigate();
    const includedItems = [
      {
        title: 'Cổng chùa / lối vào: ',
        description: 'cổng hoa sen hồng, trang trí vòm sen và lá xanh.',
      },
      {
        title: 'Đường dẫn vào chánh điện:',
        description: 'trải thảm màu trắng/kem, hai bên là bình sen hồng nở rộ.',
      },
      {
        title: 'Chánh điện (bàn lễ Phật): ',
        description: 'bình hoa sen lớn, lá sen, thắp nến sen.',
      },
      {
        title: 'Bàn nghi lễ của đôi uyên ương: ',
        description: 'phủ khăn trắng, hoa sen hồng cắm thấp, điểm lá sen xanh ngọc.',
      },
      {
        title: 'Ghế ngồi/ khu vực khách:',
        description: 'ghế phủ vải trắng, thắt nơ hồng sen hoặc xanh ngọc.',
      },
      {
        title: 'Backdrop chụp hình:',
        description: ' hoa sen cách điệu, vòng tròn vô cực hoặc mandala sen, chữ vàng “Thiện Duyên – Hằng Thuận”.',
      }
    ];
  
    const detailImages = [
      {
        src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1760881159/Rectangle_4543_h93ehc.png',
        alt: 'Chi tiết bàn tiệc',
      },
      {
        src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1761791502/image_14_jeb4ab.png',
        alt: 'Chi tiết ghế khách',
      },
      {
        src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1761791584/image_15_wlhjyo.png',
        alt: 'Chi tiết biển welcome',
      },
    ];
  
    return (
      <section className=" py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto bg-[#FDF6EE]">
          {/* Main Image Section */}
          <div className="mb-8 md:mb-12">
            <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dijayprrw/image/upload/v1762681427/Rectangle_4553_3_fiyvs7.png"
                alt="Concept Thiền"
                className="w-full h-full object-cover"
              />
              {/* Title Overlay */}
              <div 
                className="absolute left-4 md:left-8 lg:left-12 top-4 md:top-8 lg:top-12"
              >
                <h2
                  className="text-white uppercase concept-banner-title"
                  style={{
                    fontFamily: "'Hanuman', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    display: 'block',
                    margin: 0,
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', display: 'block' }}>CONCEPT</span>
                  <span style={{ whiteSpace: 'nowrap', display: 'block' }}>SEN-THUẦN KHUYẾT</span>
                </h2>
              </div>
            </div>
          </div>
  
          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
            {/* Left Section - Text Content */}
            <div className="lg:col-span-2 p-6 md:p-8 h-full flex flex-col">
              {/* Keywords */}
              <div className="mb-12 md:mb-16 flex flex-col items-center">
                <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16 justify-center mb-8 md:mb-10">
                  <span className="px-8 md:px-10 py-3 md:py-4 bg-[#A0522D] text-white rounded-full text-base md:text-lg font-bold">
                    LÃNH MẠN
                  </span>
                  <span className="px-8 md:px-10 py-3 md:py-4 bg-[#A0522D] text-white rounded-full text-base md:text-lg font-bold">
                    TINH KHIẾT
                  </span>
                </div>
                <div className="flex justify-center">
                  <span className="px-8 md:px-10 py-3 md:py-4 bg-[#A0522D] text-white rounded-full text-base md:text-lg font-bold">
                    MANG HƠI THỞ PHẬT GIÁO
                  </span>
                </div>
              </div>
  
              {/* Included Items */}
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold text-black mb-8 md:mb-10"
                  style={{ fontFamily: "'Arima Madurai', sans-serif" }}
                >
                  Hạng mục bao gồm :
                </h3>
                <ul className="space-y-6 md:space-y-8">
                  {includedItems.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-black font-bold mt-1 flex-shrink-0">•</span>
                      <div
                        className="included-item-text"
                        style={{
                          fontFamily: "'Arima Madurai', sans-serif",
                          fontStyle: 'normal',
                          fontWeight: 500,
                          color: '#000000',
                        }}
                      >
                        <span className="font-semibold">{item.title}</span>
                        <span> : {item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
  
            {/* Right Section - Detail Images */}
            <div className="lg:col-span-1 space-y-6 h-full flex flex-col">
              {detailImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full flex-1 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow min-h-[250px]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Note - Below all content */}
        <div className="max-w-7xl mx-auto bg-[#FDF6EE] mt-0 rounded-b-xl">
          <div className="px-6 md:px-8 py-6 md:py-8">
            <p 
              className="text-base md:text-lg lg:text-xl text-red-600 font-semibold text-center lg:text-left"
              style={{ fontFamily: "'Arima Madurai', sans-serif" }}
            >
              Lưu ý : Giá trị hợp đồng có thể thay đổi khi khách hàng thay đổi số lượng và thiết kế các hạng mục
            </p>
          </div>
        </div>
  
        {/* Service Package Description Section */}
        <div className="max-w-7xl mx-auto py-12 md:py-16 px-6 md:px-8">
          <div className="text-left">
            {/* Header Section */}
            <div className="mb-8 md:mb-12">
              <h3 
                className="text-lg md:text-xl lg:text-2xl font-normal mb-4 md:mb-6"
                style={{ 
                  fontFamily: "'Arima Madurai', sans-serif",
                  color: '#A0522D'
                }}
              >
                Gói dịch vụ trang trí
              </h3>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl uppercase mb-4 md:mb-6"
                style={{ 
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#8B4513',
                  fontWeight: 500,
                  lineHeight: 1.4
                }}
              >
                 
                SEN-THUẦN KHIẾT
              </h2>
              <p 
                className="text-xl md:text-2xl lg:text-3xl"
                style={{ 
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#8B7FA8',
                  fontWeight: 700
                }}
              >
               Lãng Mạn – Tinh Khiết – Gắn Kết Nhân Duyên
              </p>
            </div>
  
            {/* Descriptive Text */}
            <div className="rounded-b-lg">
              <p 
                className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 text-gray-800"
                style={{ fontFamily: "'Arima Madurai', sans-serif" }}
              >
                Là gói dịch vụ lấy cảm hứng từ hoa sen – biểu tượng của tình yêu thuần khiết và tâm hồn thanh cao, mang đến không gian vừa trang trọng vừa nên thơ.
              </p>
              <p 
                className="text-base md:text-lg lg:text-xl text-gray-800"
                style={{ fontFamily: "'Arima Madurai', sans-serif" }}
              >
                 Mỗi chi tiết được chăm chút tỉ mỉ, kết hợp màu sen hồng dịu – sắc trắng thanh khiết – ánh vàng linh thiêng, tạo nên một buổi lễ Hằng Thuận đong đầy cảm xúc, chan chứa ý nghĩa nhân duyên và hạnh phúc viên mãn.
              </p>
            </div>
          </div>
  
          {/* Call-to-Action Button */}
          <div className="text-center mt-8 md:mt-12">
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 md:px-12 lg:px-16 py-3 md:py-4 lg:py-5 bg-[#800000] hover:bg-[#A52A2A] text-white font-bold uppercase rounded-lg text-sm md:text-base lg:text-lg transition-colors duration-300"
            >
              ĐĂNG KÍ TƯ VẤN
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default SimpleConceptSection;
  
  