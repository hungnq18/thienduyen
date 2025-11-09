import { useNavigate } from 'react-router-dom';

const NatureSection = () => {
  const navigate = useNavigate();
  
  const includedItems = [
    {
      title: 'Cổng chào: vòm hoa lá xanh, thêm hoa sen hoặc mandala Phật giáo.',
      description: '',
    },
    {
      title: 'Biển Welcome: bảng gỗ rustic đặt giữa vườn cây.',
      description: '',
    },
    {
      title: 'Bàn lễ tân: gỗ mộc, hoa lá xanh + nến trắng.',
      description: '',
    },
    {
      title: 'Backdrop chụp hình: khung gỗ + dây lá xanh, view thiên nhiên phía sau.',
      description: '',
    },
    {
      title: 'Sân khấu / Bàn nghi lễ: khung tre/gỗ, hoa lá xanh, view thiên nhiên làm background.',
      description: '',
    },
    {
      title: 'Lối đi chính: đường trải hoa tươi, thắp nến dọc lối đi.',
      description: '',
    },
    {
      title: 'Ghế khách: ghế gỗ, hoa lá xanh cài sau lưng ghế.',
      description: '',
    },
    {
      title: 'Hoa bàn tiệc: lọ thủy tinh cắm hoa dại trắng – xanh.',
      description: '',
    },
    {
      title: 'Sân khấu tiệc: ánh sáng vàng nhẹ, giữ cảnh quan thiên nhiên.',
      description: '',
    },
    {
      title: 'Bánh cưới: kiểu rustic, naked cake, hoa lá trang trí tự nhiên.',
      description: '',
    },
  ];

  const leftSideImages = [
    {
      src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1762705403/Rectangle_4560_3_thkpuu.png',
      alt: 'Chi tiết trang trí',
    },
  ];

  const displayItemImages = [
    {
      src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1762705630/Rectangle_4563_2_oaoeyw.png',
      alt: 'Tay cầm đĩa với cupcake và trái cây',
    },
    {
      src: 'https://res.cloudinary.com/dijayprrw/image/upload/v1762705703/Rectangle_4564_2_ml2g9a.png',
      alt: 'Sách Lễ Hằng Thuận',
    },
  ];

  return (
    <section className=" py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto bg-[#FDF6EE]">
        {/* Main Image Section */}
        <div className="mb-8 md:mb-12 relative">   
          <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-visible">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/dijayprrw/image/upload/v1762705340/Vector_6_vojvk3.png"
                alt="Concept nature"
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
                  <span style={{ whiteSpace: 'nowrap', display: 'block' }}>NATURE FUSION -  </span>
                  <span style={{ whiteSpace: 'nowrap', display: 'block' }}>HOÀ QUYỆN THIÊN NHIÊN</span>
                </h2>
              </div>
            </div>
            {/* Left Side Image Overlay - Positioned at bottom edge of banner */}
            {leftSideImages.map((image, index) => (
              <div
                key={index}
                className="absolute left-0 bottom-[-60%] w-auto h-[90%] md:h-[100%] rounded-lg overflow-hidden shadow-lg"
                style={{ 
                  maxWidth: '90%'
                }}
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

        {/* Content Section */}
        <div className="flex flex-col md:flex-row -mt-12 md:-mt-16">
          {/* Left Side - Note */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-end">
            {/* Note - Below image */}
            <div className="px-0 py-2 mt-[30%] md:mt-[35%]">
              <p 
                className="text-sm md:text-base lg:text-lg text-red-600 font-semibold text-left leading-tight"
                style={{ 
                  fontFamily: "'Arima Madurai', sans-serif",
                  lineHeight: '1.4'
                }}
              >
                Lưu ý : Giá trị hợp đồng có thể thay đổi khi khách hàng thay đổi số lượng và thiết kế các hạng mục
              </p>
            </div>
          </div>

          {/* Right Side Content - 50% */}
          <div className="w-full md:w-1/2 p-4 md:p-6 pt-0 md:pt-0">
            {/* Included Items */}
            <div className="mb-6 md:mb-8">
              <h3
                className="text-base md:text-lg font-bold text-black mb-2 md:mb-3"
                style={{ fontFamily: "'Arima Madurai', sans-serif" }}
              >
                Hạng mục bao gồm :
              </h3>
              <ul className="space-y-1.5 md:space-y-2">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-black font-bold mt-0.5 flex-shrink-0 text-xs">•</span>
                    <div
                      className="included-item-text text-xs md:text-sm leading-tight"
                      style={{
                        fontFamily: "'Arima Madurai', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 500,
                        color: '#000000',
                        lineHeight: '1.4',
                      }}
                    >
                      <span>{item.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Display Items Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 px-6 md:px-8 pb-8 md:pb-12 justify-center items-center">
          <div className="w-auto max-w-fit bg-[#A0522D] rounded-3xl py-1.5 md:py-2 px-4 md:px-6">
            <div className="text-center">
              <h4 
                className="text-base md:text-lg lg:text-xl text-white uppercase whitespace-nowrap"
                style={{ 
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 900
                }}
              >
                GẦN GŨI TRONG TỪNG HƠI THỞ
              </h4>
            </div>
          </div>
          <div className="w-auto max-w-fit bg-[#A0522D] rounded-3xl py-1.5 md:py-2 px-4 md:px-6">
            <div className="text-center">
              <h4 
                className="text-base md:text-lg lg:text-xl text-white uppercase whitespace-nowrap"
                style={{ 
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 900
                }}
              >
                HOÀ MÌNH GIỮA SẮC THIÊN NHIÊN
              </h4>
            </div>
          </div>
        </div>

        {/* Display Item Images Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 px-6 md:px-8 pb-8 md:pb-12 justify-center items-center">
          {displayItemImages.map((image, index) => (
            <div key={index} className="w-full md:w-auto max-w-md rounded-lg overflow-hidden shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
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
                 NATURE FUSION
              </h2>
              <p 
                className="text-xl md:text-2xl lg:text-3xl"
                style={{ 
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#8B7FA8',
                  fontWeight: 700
                }}
              >
               Mộc Mạc – Tinh Tế – Hòa Quyện Thiên Nhiên
              </p>
            </div>
  
            {/* Descriptive Text */}
            <div className="rounded-b-lg">
              <p 
                className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 text-gray-800"
                style={{ fontFamily: "'Arima Madurai', sans-serif" }}
              >
               Là gói dịch vụ mang tinh thần an nhiên và tự do, lấy cảm hứng từ vẻ đẹp của đất trời, cây cỏ và ánh sáng tự nhiên.
              </p>
              <p 
                className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 text-gray-800"
                style={{ fontFamily: "'Arima Madurai', sans-serif" }}
              >
                Không gian lễ cưới được sắp đặt hài hòa giữa sắc xanh tươi mát – trắng tinh khôi – nâu gỗ ấm áp, tạo nên cảm giác gần gũi mà vẫn trang trọng.
              </p>
              <p 
                className="text-base md:text-lg lg:text-xl text-gray-800"
                style={{ fontFamily: "'Arima Madurai', sans-serif" }}
              >
                Mỗi chi tiết đều hướng đến sự cân bằng và tinh tế, nơi tình yêu được chúc phúc giữa thiên nhiên trong lành và tiếng chuông chùa ngân vang.
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

export default NatureSection;

