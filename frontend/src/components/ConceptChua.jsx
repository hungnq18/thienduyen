import { useNavigate } from "react-router-dom";
import ConceptServiceSection from "./ConceptServiceSection";
import ServiceCategorySection from "./ServiceCategorySection";

const ConceptChua = ({ activeView = "temple" }) => {
  const navigate = useNavigate();

  // Data for Service Category Section
  const serviceCategories = [
    {
      title: "KHU VỰC ĐÓN KHÁCH",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png",
      services: [
        "Cổng chùa / Cổng hoa",
        "Biển Welcome",
        "Bàn lễ tân",
        "Photobooth chụp hình"
      ]
    },
    {
      title: "KHU VỰC NGHI LỄ",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965133/Rectangle_4503_1_wvurrh.png",
      services: [
        "Chánh điện / Bàn thờ Phật",
        "Ghế ngồi khách",
        "Bàn nghi lễ uyên ương",
        "Lối đi vào chánh điện"
      ]
    },
    {
      title: "KHU VỰC KHÁC",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965186/Rectangle_4503_2_wesq0r.png",
      services: [
        "Backdrop chụp ảnh lưu niệm",
        "Thiệp mời, nhãn dán, Menu chay (nếu có)"
      ]
    }
  ];

  const handleConsultationClick = () => {
    navigate("/contact");
  };

  // Data for Concept Service Section
  const concepts = [
    {
      title: "1. Concept Truyền thống Phật giáo",
      description: "Không gian thiêng liêng, mang đậm dấu ấn nghi lễ Hằng Thuận. Màu nâu – vàng trầm ấm gợi sự tôn nghiêm và an lành.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png",
      showSwipeIndicator: true
    },
    {
      title: "2. Concept Thiền – Tối giản",
      description: "Tối giản nhưng tinh tế, sử dụng tông màu nhẹ nhàng, mang đến cảm giác an yên và sâu lắng.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965133/Rectangle_4503_1_wvurrh.png",
      showSwipeIndicator: true
    },
    {
      title: "3. Concept Sen - Biểu tượng Tình yêu thuần khiết",
      description: "Lấy cảm hứng từ hoa sen – biểu tượng của tình yêu trong sáng. Không gian nhẹ nhàng, thanh khiết và tràn đầy ý nghĩa.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965186/Rectangle_4503_2_wesq0r.png",
      showSwipeIndicator: true
    }
  ];

  const handleViewMore = () => {
    navigate("/services");
  };

  const handlePackageClick = (pkg) => {
    const sectionMap = {
      'GÓI MODERN ZEN': 'modern-zen-section',
      'GÓI ELEGANT CONTEMPORARY': 'elegant-section',
      'GÓI NATURE FUSION': 'nature-section',
    };

    const sectionId = sectionMap[pkg.name];
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
    {/* Temple Content */}
    <section id="temple-section" className="w-full bg-[#F6EFE7] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 lg:gap-12 items-center">
        <div className="bg-[#F6EFE7]">
          <h2
            className="text-lg sm:text-xl md:text-2xl mt-2 tracking-tight uppercase font-bold"
            style={{ fontFamily: "Be Vietnam Pro, sans-serif", color: "#6B2C1B" }}
          >
            Trang trí tiệc cưới tại chùa
          </h2>
          <p
            className="mt-3 text-sm sm:text-base md:text-lg leading-snug text-justify sm:text-left max-w-[440px] font-semibold"
            style={{ fontFamily: "'Arima Madurai', sans-serif", color: "#3F2B20" }}
          >
            Không gian tiệc cưới tại chùa được trang trí trang nghiêm, tinh tế, giữ
            trọn nét truyền thống mang đậm dấu ấn Phật giáo và sự an lạc trong ngày
            cưới.
          </p>
        </div>

        <div className="w-full">
          <div className="relative w-full rounded-md border border-[#E5DED3] bg-[#E1DDDA] shadow-sm overflow-hidden aspect-[16/9]">
            <iframe
              src="https://www.youtube.com/embed/SXwb14EMJbY?start=180"
              title="Thiện Duyên Concept Chùa"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Concerns Section */}
      <div
        className="relative mt-16 sm:mt-20 md:mt-24 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dijayprrw/image/upload/v1762960608/Rectangle_4497_1_c6fcqx.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-[#F6EFE7]/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[42%_58%] gap-10 lg:gap-14 items-center">
            {/* Left: Main Title */}
            <div className="flex items-center justify-center pt-12 sm:pt-16 md:pt-20">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight drop-shadow-md text-center"
                style={{
                  fontFamily: "Be Vietnam Pro, sans-serif",
                  color: "#6B2C1B",
                  textShadow: "2px 2px 6px rgba(0,0,0,0.25)"
                }}
              >
                Nỗi lo lắng của các cặp đôi
              </h2>
            </div>

            {/* Right: Question Bubbles */}
            <div className="space-y-12 sm:space-y-7 flex flex-col items-stretch mt-8 sm:mt-10 md:mt-12">
              {[
                "Muốn tổ chức Lễ Hằng Thuận nhưng không biết bắt đầu từ đâu?",
                "Không biết liên hệ chùa nào, làm sao để được chư Tăng chứng minh?",
                "Làm thế nào để lễ vừa đúng nghi thức Phật giáo, vừa mang nét hiện đại, tinh tế?"
              ].map((question, idx) => (
                <div
                  key={idx}
                  className="bg-[#E0E0E0] rounded-lg px-4 sm:px-5 py-3 sm:py-4 shadow-sm w-full md:w-auto"
                >
                  <p
                    className="text-[9px] sm:text-[10px] md:text-xs leading-relaxed font-semibold"
                    style={{
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      color: "#7A1F1F",
                      letterSpacing: "0.03em"
                    }}
                  >
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* "Thuốc Giảm Lo" Section */}
      <div className="w-full bg-[#F6EFE7] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          {/* Main Title */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold italic text-center mb-12 sm:mb-16 md:mb-20"
            style={{
              fontFamily: "Be Vietnam Pro, sans-serif",
              color: "#6B2C1B"
            }}
          >
            "THUỐC GIẢM LO" TỪ THIỆN DUYÊN
          </h2>

          {/* Two Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  text: 'Không chỉ là "nghi lễ"',
                  image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762964100/Ellipse_1_xmvt8n.png"
                },
                {
                  text: "Bạn luôn là tâm điểm",
                  image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762964303/Ellipse_2_1_cliygl.png"
                },
                {
                  text: "Sẵn sàng lắng nghe",
                  image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762964208/Ellipse_3_urbpx8.png"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 sm:gap-5">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover"
                    />
                  </div>
                  <p
                    className="text-xs sm:text-sm md:text-base font-medium flex-1"
                    style={{
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      color: "#6B2C1B"
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  text: "An tâm từ thiết kế đến tổ chức",
                  image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762964348/Ellipse_6_x7wtcg.png"
                },
                {
                  text: "Tổ chức trực tiếp & chuyên nghiệp",
                  image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762964424/Ellipse_5_tl1hcp.png"
                },
                {
                  text: "Lan tỏa giá trị hạnh phúc",
                  image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762964494/Ellipse_4_oljelg.png"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 sm:gap-5">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover"
                    />
                  </div>
                  <p
                    className="text-xs sm:text-sm md:text-base font-medium flex-1"
                    style={{
                      fontFamily: "Be Vietnam Pro, sans-serif",
                      color: "#6B2C1B"
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Service Category Section */}
    <ServiceCategorySection
      title="CÁC HẠNG MỤC TRANG TRÍ TIỆC CƯỚI TẠI CHÙA"
      categories={serviceCategories}
      gridCols={3}
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

export default ConceptChua;

