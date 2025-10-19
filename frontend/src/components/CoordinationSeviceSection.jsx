
function DecorationSeviceSection() {
  return (
    <div className='relative w-full'>
      <img
        src="https://res.cloudinary.com/dijayprrw/image/upload/v1760801830/Rectangle_4481_uvgdwv.png"
        alt="Decoration Service"
        className="w-full h-full object-cover"
      />
      <div className= 'w-5/6 mx-auto'>
      {/* Title */}

      <div style={{ position: 'absolute', top: 90, left: 32, textAlign: 'left', zIndex: 20 }}>
        <div style={{ display: 'inline-block', textAlign: 'center', color: '#FFFFFF' }}>
          <div style={{ fontFamily: 'Berkshire Swash, cursive', fontSize: 64, lineHeight: '64px' }}>Coordination</div>
          <div style={{ fontFamily: 'Berkshire Swash, cursive', fontSize: 60, lineHeight: '60px', marginLeft: 28, paddingTop: 4 }}>Service</div>
        </div>
      </div>
      <div className="flex">
        <img src="https://res.cloudinary.com/dijayprrw/image/upload/v1760802313/Rectangle_4484_mrfxbz.png" alt="Decoration Service" className="w-full h-full py-10 object-cover" />
          <div className="w-full py-10 flex justify-center">
            <div
              className="bg-[#EBEBEB] text-center px-10 py-12 max-w-[700px]">
              {/* Subtitle */}
              <p
                style={{
                  fontFamily: 'Arima Madurai, sans-serif',
                  fontSize: '16px',
                  color: '#000000',
                  opacity: 0.9,
                  marginBottom: '12px',
                }}
              >
                Gói dịch vụ
              </p>

              {/* Main Title */}
              <h2
                style={{
                  fontFamily: "'Beau Rivage', sans-serif",
                  fontSize: '46px',
                  lineHeight: '52px',
                  color: '#000000',
                  marginBottom: '28px',
                }}
              >
                Điều phối chương trình
              </h2>

              {/* Service List */}
              <ul
                style={{
                  fontFamily: "'Arima Madurai', serif",
                  fontSize: '18px',
                  lineHeight: '32px',
                  color: '#000000',
                  textAlign: 'left',
                  display: 'inline-block',
                  marginBottom: '40px',
                }}
                className="list-disc list-inside space-y-2"
              >
                <li>Tư vấn & lên ý tưởng kịch bản chương trình cưới</li>
                <li>Xây dựng timeline & quản lý xuyên suốt</li>
                <li>Quản lý âm thanh, ánh sáng, MC, hậu trường</li>
                <li>Điều phối nghi lễ & các hoạt động tâm linh</li>
                <li>Điều hành đội ngũ & các nhà cung cấp</li>
                <li>Xử lý phát sinh & kiểm soát rủi ro</li>
              </ul>

              {/* Contact Button */}
              <button
                className="transition-colors duration-300 uppercase border-2 text-[20px] leading-[30px]"
                style={{
                  backgroundColor: '#610912',
                  color: '#FFFFFF',
                  borderColor: '#610912',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  width: '170px',
                  height: '45px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
  )
}

export default DecorationSeviceSection
