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

      {/* ================= Get In Touch Section ================= */}
      <div className="relative w-full bg-[#FDF6EE] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4 sm:px-6">
          {/* Left Image */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-start md:absolute md:left-0 md:top-0">
            <img
              src="https://res.cloudinary.com/dijayprrw/image/upload/v1760742053/Rectangle_4483_rdoryq.png"
              alt="Wedding Couple"
              className="w-[85%] sm:w-[70%] md:w-full h-auto object-cover md:h-[auto]"
            />
          </div>

          {/* Right Box */}
          <div className="relative w-full md:w-1/2 bg-[#FDF6EE] border-[10px] sm:border-[20px] border-[#EBEBEB] p-6 sm:p-8 text-center md:text-center md:ml-[45%]">
            <p
              className="text-[13px] sm:text-[14px] opacity-90 text-black"
              style={{ fontFamily: 'Arima Madurai,sans-serif' }}
            >
              Get in touch
            </p>

            <h2
              className="uppercase font-[Bebas_Neue] text-[28px] sm:text-[36px] md:text-[39px] leading-tight text-black tracking-[1px] my-3"
            >
              CELEBRATE YOUR MOST <br className="hidden sm:block" /> BEAUTIFUL DAY
            </h2>

            <p
              className="text-[15px] sm:text-[17px] md:text-[18px] leading-[28px] text-black mb-6 md:text-justify md:pl-6"
              style={{ fontFamily: "'Arima Madurai', serif" }}
            >
              Tại Thiện Duyên, chúng tôi tin rằng ngày cưới không chỉ là một sự kiện,
              mà là khoảnh khắc thiêng liêng mở ra hành trình mới. Bằng sự tận tâm và tinh tế,
              Thiện Duyên kiến tạo không gian và nghi lễ để mỗi cặp đôi có thể tận hưởng trọn vẹn
              ngày đẹp nhất trong đời mình.
            </p>

            <button
              onClick={() => navigate('/contact')}
              className="uppercase border-2 text-[20px] sm:text-[23px] md:text-[25px] w-[160px] sm:w-[180px] md:w-[200px] h-[42px] sm:h-[45px] mx-auto md:mx-0 flex justify-center items-center md:items-center transition-all duration-300"
              style={{
                backgroundColor: '#610912',
                color: '#FFFFFF',
                borderColor: '#610912',
                fontFamily: 'Bebas Neue, sans-serif',
                fontWeight: 200,
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
