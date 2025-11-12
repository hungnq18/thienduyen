import { useNavigate } from "react-router-dom";
import rounder from "../assets/rounder.png";

const decorationFeatures = [
  {
    id: 1,
    number: "01",
    text: "Dựa theo quy mô tiệc cưới thực hiện khảo sát địa điểm tổ chức, làm việc cùng nhà cung cấp địa điểm tiệc và bố trí layout cho đám cưới",
  },
  {
    id: 2,
    number: "02",
    text: "Dựa theo sở thích của cặp đôi mà ngân sách dự kiến lên ý tưởng và tư vấn phong cách trang trí phù hợp",
  },
  {
    id: 3,
    number: "03",
    text: "Đảm bảo trang trí thực tế theo sát với bản thiết kế, phù hợp với thẩm mỹ, tính chất đám cưới",
  },
];

function DecorationServiceSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full mt-[850px] sm:mt-80 md:mt-90 lg:mt-100">
      {/* Background Image */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760735023/image_18_d194t4.png"
          alt="Decoration Service"
          className="w-full h-auto object-cover"
          loading="lazy"
        />

        {/* Responsive Title Overlay */}
        <div className="absolute top-[4%] right-[5%] sm:top-16 sm:right-12 md:top-20 md:right-20 text-right z-20">
          <div className="inline-block text-center text-white drop-shadow-lg">
            <h2
              className="text-[26px] sm:text-[48px] md:text-[60px] lg:text-[64px] leading-none"
              style={{ fontFamily: "Berkshire Swash, cursive" }}
            >
              Decoration
            </h2>
            <h3
              className="text-[22px] sm:text-[44px] md:text-[58px] lg:text-[60px] leading-none pt-1 sm:pt-2 md:pt-3"
              style={{ fontFamily: "Berkshire Swash, cursive" }}
            >
              Service
            </h3>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#FDF6EE] py-10 sm:py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 text-center items-start">
            {decorationFeatures.map((f) => (
              <div key={f.id}>
                {/* Badge */}
                <div className="relative mx-auto mb-4 w-[80px] h-[82px] sm:w-[90px] sm:h-[94px]">
                  <img
                    src={rounder}
                    alt={`badge-${f.number}`}
                    className="w-full h-full object-contain"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-[26px] sm:text-[30px] font-normal text-black"
                    style={{ fontFamily: "'Be Vietnam', sans-serif" }}
                  >
                    {f.number}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-[15px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[28px] md:leading-[30px] max-w-[320px] mx-auto text-justify sm:text-center"
                  style={{
                    fontFamily: "Arima Madurai, serif",
                    color: "#000000",
                  }}
                >
                  {f.text}
                </p>
              </div>
            ))}
          </div>

          {/* Button moved below all items */}
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
            <button
              className="uppercase transition-all duration-300 border-2 flex items-center justify-center text-[20px] sm:text-[25px] md:text-[28px] w-[140px] sm:w-[180px] md:w-[200px] h-[40px] sm:h-[45px] text-white border-[#610912] bg-[#610912] hover:bg-white hover:text-[#610912]"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontWeight: 200,
                letterSpacing: "0.05em",
                borderRadius: "0",
              }}
              onClick={() => navigate('/concept')}
            >
              XEM THÊM
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DecorationServiceSection;
