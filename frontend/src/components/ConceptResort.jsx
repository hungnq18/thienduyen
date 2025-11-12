import { useNavigate } from "react-router-dom";
import ConceptServiceSection from "./ConceptServiceSection";
import ServiceCategorySection from "./ServiceCategorySection";

const ConceptResort = ({ activeView = "resort" }) => {
  const navigate = useNavigate();

  // Data for Service Category Section
  const serviceCategories = [
    {
      title: "KHU VỰC ĐÓN KHÁCH",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png",
      services: [
        "Cổng chào",
        "Biển Welcome",
        "Bàn lễ tân",
        "Backdrop chụp hình"
      ]
    },
    {
      title: "KHU VỰC NGHI LỄ",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965133/Rectangle_4503_1_wvurrh.png",
      services: [
        "Sân khấu / Bàn nghi lễ",
        "Lối đi chính",
        "Ghế khách"
      ]
    },
    {
      title: "KHU VỰC TIỆC & TRẢI NGHIỆM",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965186/Rectangle_4503_2_wesq0r.png",
      services: [
        "Hoa bàn tiệc",
        "Sân khấu tiệc",
        "Bánh cưới"
      ]
    },
    {
      title: "HẠNG MỤC KHÁC",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png",
      services: [
        "Thiệp",
        "Menu",
        "Số bàn",
        "Nhãn dán ở hastag"
      ]
    }
  ];

  const handleConsultationClick = () => {
    navigate("/contact");
  };

  // Data for Concept Service Section
  const concepts = [
    {
      title: "1.Modern Zen – Thiền hiện đại",
      description: "Tối giản mà tinh tế, hòa quyện giữa thiền vị và hơi thở đương đại. Mỗi chi tiết đều gợi cảm giác an yên.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png",
      showSwipeIndicator: true
    },
    {
      title: "2.Elegant Contemporary – Sang trọng hiện đại",
      description: "Thanh lịch và thời thượng, kết hợp hài hòa giữa nét truyền thống Á Đông và phong cách cưới hiện đại đầy tinh tế.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965133/Rectangle_4503_1_wvurrh.png",
      showSwipeIndicator: true
    },
    {
      title: "3. Nature Fusion – Hòa quyện thiên nhiên",
      description: "Hơi thở thiên nhiên trong từng cánh hoa, nhành lá. Một không gian trong lành, giản dị mà chan chứa bình yên.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965186/Rectangle_4503_2_wesq0r.png",
      showSwipeIndicator: true
    }
  ];

  const handleViewMore = () => {
    navigate("/services");
  };



  // Data for Wedding Services Cards
  const weddingServicesCards = [
    {
      title: "NGHI LỄ LINH THIÊNG, TRẢI NGHIỆM THƯ THÁI",
      description: "Không gian xanh mát, nhịp sống chậm rãi của resort mang đến cho khách mời một trải nghiệm bình yên, thư thái và hạnh phúc bên cạnh cặp đôi.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png"
    },
    {
      title: "CÁ NHÂN HÓA LỄ CƯỚI CỦA RIÊNG BẠN",
      description: "Lễ Hằng Thuận tại resort cho phép bạn thể hiện phong cách và câu chuyện tình yêu riêng của mình, kết hợp giữa nghi lễ truyền thống và những nét cá nhân độc đáo.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965133/Rectangle_4503_1_wvurrh.png"
    },
    {
      title: "KẾT NỐI GIA ĐÌNH, LAN TỎA YÊU THƯƠNG",
      description: "Gia đình có thể lưu lại lâu hơn tại resort, cùng nhau trò chuyện, tận hưởng thiên nhiên, tham dự nghi lễ và tận hưởng những khoảnh khắc hiếm có bên nhau.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965186/Rectangle_4503_2_wesq0r.png"
    },
    {
      title: "SANG TRỌNG MÀ GẦN GŨI, HIỆN ĐẠI MÀ AN YÊN",
      description: "Mọi yếu tố từ cảnh quan, âm nhạc đến nghi lễ đều được hòa quyện một cách hài hòa, kết hợp giữa truyền thống và hiện đại, mang đến một lễ cưới đơn giản, thanh lịch, vừa thiêng liêng vừa an yên.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png"
    }
  ];

  return (
    <>
    {/* Resort Content */}
    <section id="resort-section" className="w-full bg-[#F6EFE7] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 lg:gap-12 items-center">
        {/* Video - Left Side */}
        <div className="w-full order-2 md:order-1">
          <div className="relative w-full rounded-md border border-[#E5DED3] bg-[#E1DDDA] shadow-sm overflow-hidden aspect-[16/9]">
            <iframe
              src="https://www.youtube.com/embed/5UkY_0RMejA"
              title="Thiện Duyên Concept Resort"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Content - Right Side */}
        <div className="bg-[#F6EFE7] order-1 md:order-2 flex flex-col justify-center">
          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight uppercase font-bold mb-4 sm:mb-6"
            style={{ fontFamily: "Be Vietnam Pro, sans-serif", color: "#8B4513" }}
          >
            TRANG TRÍ TIỆC CƯỚI TẠI RESORT
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-left mb-6 sm:mb-8"
            style={{ fontFamily: "'Arima Madurai', sans-serif", color: "#3F2B20" }}
          >
            Tiệc cưới tại resort mang vẻ đẹp tinh tế, lãng mạn với không gian mở lý tưởng cho khoảnh khắc thiêng liêng và đáng nhớ.
          </p>
          <button
            onClick={handleConsultationClick}
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-md font-bold uppercase text-xs sm:text-sm md:text-base transition-colors shadow-sm hover:shadow-md w-full sm:w-auto"
            style={{
              backgroundColor: "#8B4513",
              color: "#FFFFFF",
              fontFamily: "Be Vietnam Pro, sans-serif"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#6B3410"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#8B4513"}
          >
            ĐĂNG KÍ TƯ VẤN
          </button>
        </div>
      </div>
    </section>

    {/* Wedding Services Section - 4 Cards */}
    <section className="w-full bg-[#F6EFE7] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
          {weddingServicesCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row"
            >
              {/* Card Image - Left Side */}
              <div className="w-full md:w-2/5 flex-shrink-0 aspect-video md:aspect-auto md:h-auto overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Card Content - Right Side */}
              <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-center">
                <h3
                  className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4"
                  style={{
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    color: "#6B2C1B"
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base leading-relaxed text-justify"
                  style={{
                    fontFamily: "'Arima Madurai', sans-serif",
                    color: "#000000"
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonial/Quote Section - White Background */}
    <section className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Testimonial/Quote Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* Large Quotation Marks - Centered */}
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <svg 
              width="70" 
              height="70" 
              viewBox="0 0 70 70" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            >
              <path 
                d="M31.436 61.25H2.91683V32.0833L14.5835 11.6667H23.3335L14.5835 32.0833H31.436V61.25ZM67.0835 61.25H38.5643V32.0833L49.5835 11.6667H58.3335L49.5835 32.0833H67.0835V61.25Z" 
                fill="#700304"
              />
            </svg>
          </div>
          
          {/* Quote Text - Centered */}
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12"
            style={{
              fontFamily: "'Arima Madurai', sans-serif",
              color: "#000000"
            }}
          >
            Để tổ chức một Lễ Hằng Thuận thật trọn vẹn, đôi khi không chỉ cần sự chuẩn bị kỹ lưỡng, mà còn cần sự an tâm và thấu hiểu từ những người đồng hành. Thiện Duyên sẽ cùng bạn vun đắp từng chi tiết – từ nghi lễ, không gian, đến cảm xúc – để ngày kết duyên trở thành một hành trình thiêng liêng, an nhiên và đầy yêu thương.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConsultationClick}
            className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-md font-bold uppercase text-sm sm:text-base md:text-lg transition-colors shadow-md hover:shadow-lg"
            style={{
              backgroundColor: "#8B4513",
              color: "#FFFFFF",
              fontFamily: "Be Vietnam Pro, sans-serif"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#6B3410"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#8B4513"}
          >
            ĐĂNG KÍ TƯ VẤN
          </button>
        </div>
      </div>
    </section>

    {/* Service Category Section */}
    <ServiceCategorySection
      title="CÁC HẠNG MỤC TRONG TRANG TRÍ TẠI RESORT"
      categories={serviceCategories}
      ctaButton={{
        text: "ĐĂNG KÍ TƯ VẤN",
        onClick: handleConsultationClick
      }}
    />

    {/* Concept Service Section */}
    <ConceptServiceSection
      title="DỊCH VỤ TRANG TRÍ TIỆC CƯỚI CỦA THIỆN DUYÊN"
      description="Thiện Duyên xin giới thiệu tới bạn các gói dịch vụ trang trí đáp ứng được mọi nhu cầu về ngân sách đặc biệt còn thể hiện được tính cá nhân của cặp đôi."
      concepts={concepts}
      viewMoreButton={{
        text: "XEM THÊM",
        onClick: handleViewMore
      }}
    />
    </>
  );
};

export default ConceptResort;

