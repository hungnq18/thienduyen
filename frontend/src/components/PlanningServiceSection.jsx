import { useNavigate } from 'react-router-dom';
import rounder from '../assets/rounder.png';

const decorationFeatures = [
  { id: 1, number: '01', text: 'Tìm kiếm, tư vấn lựa chọn và làm việc cùng các đơn vị cung cấp' },
  { id: 2, number: '02', text: 'Lên kế hoạch, lịch trình chuẩn bị đám cưới' },
  { id: 3, number: '03', text: 'Tư vấn và quản lý ngân sách đám cưới' },
  { id: 4, number: '04', text: 'Tư vấn thẩm mỹ đám cưới' },
  { id: 5, number: '05', text: 'Tư vấn chương trình và kịch bản tổ chức' },
];

function PlanningServiceSection() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* ================= Banner Section ================= */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760735023/image_18_d194t4.png"
          alt="Decoration Service"
          className="w-full h-auto object-cover"
          loading="lazy"
        />

        {/* Responsive Title Overlay */}
        <div className="absolute top-[4%] left-[5%] sm:top-16 sm:left-12 md:top-20 md:left-20 text-left z-20">
          <div className="inline-block text-center text-white drop-shadow-lg">
            <h2
              className="text-[26px] sm:text-[48px] md:text-[60px] lg:text-[64px] leading-none"
              style={{ fontFamily: "Berkshire Swash, cursive" }}
            >
              Planning
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

      {/* ================= Text Section ================= */}
      <div className="w-full bg-[#FDF6EE] pt-10 pb-5 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <p 
            className="text-justify text-[16px] sm:text-[17px] lg:text-[18px] leading-relaxed text-gray-800 font-medium"
            style={{ fontFamily: 'Arima Madurai, serif', lineHeight: '1.8' }}
          >
            Chúng tôi tin rằng mỗi đám cưới không chỉ là ngày trong đại, mà còn là một hành trình thiêng liêng. 
            Với sự đồng hành tận tâm, Thiện Duyên giúp cặp đôi từ khâu chuẩn bị, xây dựng ý tưởng cho đến tổ chức trọn vẹn nghi lễ, để ngày cưới trở thành đầu ấn đẹp và ý nghĩa nhất trong đời.
          </p>
        </div>
      </div>

      {/* ================= Get In Touch Section ================= */}
      <div className="relative w-full bg-[#FDF6EE] pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex flex-col lg:flex-row items-center lg:items-center justify-center">
            {/* Left Image - Overlapping */}
            <div className="relative lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-10 mb-8 lg:mb-0">
              <img
                src="https://res.cloudinary.com/dijayprrw/image/upload/v1760742053/Rectangle_4483_rdoryq.png"
                alt="Wedding Couple"
                className="w-full max-w-[480px] lg:max-w-[600px] xl:max-w-[650px] h-auto object-cover"
              />
            </div>

            {/* Right Box - Content with left padding to avoid overlap */}
            <div className="w-full lg:w-auto lg:ml-auto lg:max-w-[700px] xl:max-w-[800px]">
              <div className="w-full border-[15px] lg:border-[20px] border-[#EBEBEB] lg:pl-48 xl:pl-56 pr-8 lg:pr-12 py-8 lg:py-12 pl-8 text-center">
                <p
                  className="text-[14px] lg:text-[15px] text-gray-700 mb-2"
                  style={{ fontFamily: 'Arima Madurai, sans-serif' }}
                >
                  Get in touch
                </p>

                <h2
                  className="uppercase text-[32px] lg:text-[40px] xl:text-[45px] leading-tight text-black font-normal mb-6"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.02em' }}
                >
                  CELEBRATE YOUR MOST<br />
                  BEAUTIFUL DAY
                </h2>

                <p
                  className="text-[16px] lg:text-[17px] xl:text-[18px] leading-relaxed text-gray-800 mb-8"
                  style={{ fontFamily: 'Arima Madurai, serif', lineHeight: '1.8' }}
                >
                  Tại Thiện Duyên, chúng tôi tin rằng ngày cưới không chỉ là một sự kiện, 
                  mà là khoảnh khắc thiêng liêng mở ra hành trình mới. Bằng sự tận tâm và tinh tế, 
                  Thiện Duyên kiến tạo không gian và nghi lễ để mỗi cặp đôi có thể tận hưởng trọn vẹn 
                  ngày đẹp nhất trong đời mình – an yên, ý nghĩa và vĩnh cửu.
                </p>

                <button
                  onClick={() => navigate('/contact')}
                  className="uppercase text-[22px] lg:text-[24px] px-8 py-3 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: '#610912',
                    color: '#FFFFFF',
                    border: '2px solid #610912',
                    fontFamily: 'Bebas Neue, sans-serif',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#610912';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#610912';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Features Zigzag Diamond ================= */}
      <div className="w-full bg-[#FDF6EE] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-14">
          <div className="relative w-full flex flex-col items-center">
            {/* Desktop zigzag grid */}
            <div className="hidden lg:grid grid-cols-5 gap-x-10 gap-y-16 justify-items-center">
              <div className="col-start-1 row-start-1">{renderFeature(decorationFeatures[0])}</div>
              <div className="col-start-3 row-start-1">{renderFeature(decorationFeatures[1])}</div>
              <div className="col-start-5 row-start-1">{renderFeature(decorationFeatures[2])}</div>
              <div className="col-start-2 row-start-2">{renderFeature(decorationFeatures[3])}</div>
              <div className="col-start-4 row-start-2">{renderFeature(decorationFeatures[4])}</div>
            </div>

            {/* Mobile grid */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 justify-items-center">
              {decorationFeatures.map((f) => renderFeature(f))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Render Feature Item */
function renderFeature(f) {
  return (
    <div key={f.id} className="flex flex-col items-center max-w-[240px]">
      <div className="relative w-[70px] sm:w-[80px] md:w-[93px] h-[70px] sm:h-[80px] md:h-[96px] mb-4">
        <img src={rounder} alt={`badge-${f.number}`} className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center text-[20px] sm:text-[24px] md:text-[30px] font-['Be Vietnam'] text-black">
          {f.number}
        </div>
      </div>
      <p
        className="text-[15px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[28px] text-black text-center"
        style={{ fontFamily: "'Arima Madurai', serif" }}
      >
        {f.text}
      </p>
    </div>
  );
}

export default PlanningServiceSection;
