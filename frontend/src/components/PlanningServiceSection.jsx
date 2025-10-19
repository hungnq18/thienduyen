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
  const total = decorationFeatures.length;
const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760739503/Rectangle_4479_1_r25rqf.png"
          alt="Decoration Service"
          className="w-full h-full object-cover"
        />

        {/* Title */}
        <div style={{ position: 'absolute', top: 90, left: 32, textAlign: 'left', zIndex: 20 }}>
          <div style={{ display: 'inline-block', textAlign: 'center', color: '#FFFFFF' }}>
            <div style={{ fontFamily: 'Berkshire Swash, cursive', fontSize: 64, lineHeight: '64px' }}>Planning</div>
            <div style={{ fontFamily: 'Berkshire Swash, cursive', fontSize: 60, lineHeight: '60px', marginLeft: 28, paddingTop: 4 }}>Service</div>
          </div>
        </div>

        {/* Intro text */}
        <p
          className="px-30 py-10"
          style={{
            boxSizing: 'border-box',
            fontFamily: "'Arima Madurai', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '29px',
            textAlign: 'justify',
            color: '#000000',
            margin: 0,
          }}
        >
          Chúng tôi tin rằng mỗi đám cưới không chỉ là một ngày trọng đại, mà còn là một hành trình thiêng liêng. Với sự đồng hành tận tâm, Thiện Duyên giúp cặp đôi từ khâu chuẩn bị, xây dựng ý tưởng cho đến tổ chức trọn vẹn nghi lễ, để ngày cưới trở thành dấu ấn đẹp và ý nghĩa nhất trong đời.
        </p>
      </div>

      {/* Get in touch card */}
      <div className="w-full bg-[#FDF6EE] py-16">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">
    {/* Left image */}
    <div className="w-full absolute md:w-1/2 z-100">
      <img
        src="https://res.cloudinary.com/dijayprrw/image/upload/v1760742053/Rectangle_4483_rdoryq.png"
        alt="Wedding Couple"
        className="w-full h-1/2 rounded-none object-cover"
      />
    </div>

    {/* Right text box */}
    <div className="w-full relative md:w-1/2 left-160 bg-[#FDF6EE] border-[20px] border-[#EBEBEB] p-8 text-center md:text-left">
    <div className='w-full pl-50'>
      <p
        style={{
          fontFamily: 'Arima Madurai,sans-serif',
          fontSize: '14px',
          color: '#000000',
          opacity: 0.9,
          textAlign: 'center',
        }}
      >
        Get in touch
      </p>
      <h2
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '39px',
          lineHeight: '47px',
          color: '#000000',
          letterSpacing: '1px',
          marginBottom: '16px',
          textAlign: 'center',
        }}
        className="uppercase"
      >
        CELEBRATE YOUR MOST <br />BEAUTIFUL DAY
      </h2>
      <p
        style={{
          fontFamily: "'Arima Madurai', serif",
          fontSize: '18px',
          lineHeight: '30px',
          color: '#000000',
          marginBottom: '28px',
          textAlign: 'center',
        }}
      >
        Tại Thiện Duyên, chúng tôi tin rằng ngày cưới không chỉ là một sự kiện,
        mà là khoảnh khắc thiêng liêng mở ra hành trình mới. Bằng sự tận tâm và
        tinh tế, Thiện Duyên kiến tạo không gian và nghi lễ để mỗi cặp đôi có
        thể tận hưởng trọn vẹn ngày đẹp nhất trong đời mình – an yên, ý nghĩa và
        vĩnh cửu.
      </p>

      <button
        className="transition-colors duration-300 uppercase border-2 text-[25px] leading-[30px] justify-center flex mx-auto"
        style={{
          backgroundColor: '#610912',
          color: '#FFFFFF',
          borderColor: '#610912',
          fontFamily: 'Bebas Neue, sans-serif',
          fontWeight: 200,
          letterSpacing: '0.05em',
          width: '200px',
          height: '45px',
          textAlign: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFFFF';
          e.currentTarget.style.color = '#610912';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#610912';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onClick={() => {
          navigate ('/contact');
        }}
      >
        CONTACT US
      </button>
      </div>
      
    </div>
  </div>
</div>


      {/* ✅ Features (zigzag layout) */}
      <div className="w-full bg-[#FDF6EE] py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-5 gap-y-20 justify-items-center text-center">
            {/* Row 1 */}
            <div className="col-start-1 row-start-1">{renderFeature(decorationFeatures[0])}</div>
            <div className="col-start-3 row-start-1">{renderFeature(decorationFeatures[1])}</div>
            <div className="col-start-5 row-start-1">{renderFeature(decorationFeatures[2])}</div>

            {/* Row 2 */}
            <div className="col-start-2 row-start-2">{renderFeature(decorationFeatures[3])}</div>
            <div className="col-start-4 row-start-2">{renderFeature(decorationFeatures[4])}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderFeature(f) {
  return (
    <div key={f.id} className="flex flex-col items-center max-w-[260px]">
      <div className="relative w-[93px] h-[96px] mb-4">
        <img src={rounder} alt={`badge-${f.number}`} className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center text-[30px] font-['Be Vietnam'] text-black">
          {f.number}
        </div>
      </div>
      <p
        style={{
          fontFamily: "'Arima Madurai', serif",
          fontSize: '18px',
          lineHeight: '28px',
          color: '#000000',
          textAlign: 'center',
        }}
      >
        {f.text}
      </p>
    </div>
  );
}

export default PlanningServiceSection;
