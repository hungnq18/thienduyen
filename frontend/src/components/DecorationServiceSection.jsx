import rounder from '../assets/rounder.png';

const decorationFeatures = [
  {
    id: 1,
    number: '01',
    text: 'Dựa theo quy mô tiệc cưới thực hiện khảo sát địa điểm tổ chức, làm việc cùng nhà cung cấp địa điểm tiệc và bố trí layout cho đám cưới'
  },
  {
    id: 2,
    number: '02',
    text: 'Dựa theo sở thích của cặp đôi mà ngân sách dự kiến lên ý tưởng và tư vấn phong cách trang trí phù hợp'
  },
  {
    id: 3,
    number: '03',
    text: 'Đảm bảo trang trí thực tế theo sát với bản thiết kế, phù hợp với thẩm mỹ, tính chất đám cưới'
  }
];

function DecorationServiceSection() {
  return (
    <div className="relative w-full mt-100">
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760735023/image_18_d194t4.png"
          alt="Decoration Service"
          className="w-full h-full object-cover"
        />

        {/* Title positioned top-right over the image as a single block (lục-bát style) */}
        <div style={{ position: 'absolute', top: 90, right: 32, textAlign: 'right', zIndex: 20 }}>
          <div style={{ display: 'inline-block', textAlign: 'center', color: '#FFFFFF' }}>
            <div style={{ fontFamily: 'Berkshire Swash, cursive', fontSize: 64, lineHeight: '64px' }}>Decoration</div>
            <div style={{ fontFamily: 'Berkshire Swash, cursive', fontSize: 60, lineHeight: '60px', marginLeft: 28, paddingTop: 4 }}>Service</div>
          </div>
        </div>
      </div>

      {/* Features row below image */}
      <div className="w-full bg-[#FDF6EE] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-start">
            {decorationFeatures.map((f) => (
              <div key={f.id}>
                {/* Badge: raster rounder image with centered number overlay */}
                <div style={{ width: 93, height: 96, margin: '0 auto 18px', position: 'relative' }}>
                  <img src={rounder} alt={`badge-${f.number}`} style={{ width: '93px', height: '96px', display: 'block' }} />
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 93,
                    height: 96,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Be Vietnam', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: 30,
                    lineHeight: '44px',
                    textAlign: 'center',
                    color: '#000000',
                    pointerEvents: 'none'
                  }}>{f.number}</div>
                </div>

                <p style={{ fontFamily: 'Arima Madurai, serif', fontSize: 18, lineHeight: '28px', color: '#000000', maxWidth: 320, margin: '0 auto' }}>
                  {f.text}
                </p>

                {f.id === 2 && (
                   <button className="mx-auto transition-colors duration-300 uppercase border-2 text-[32px] leading-[38px] mt-8" style={{ backgroundColor: '#610912', color: '#FFFFFF', borderColor: '#610912', borderRadius: '0', fontFamily: 'Bebas Neue, sans-serif', fontWeight: 200, width: '200px', height: '45px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.05em' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#610912'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#610912'; e.currentTarget.style.color = '#FFFFFF'; }}>
                   <span className="text-[25px] leading-[30px]" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 200, letterSpacing: '0.05em' }}>XEM THÊM</span>
                </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecorationServiceSection;
