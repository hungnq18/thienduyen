
const AboutUsSection = () => {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div className="w-full h-auto">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760690908/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_11_1_rtaksi.png"
          alt="About Us Background"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay Content Box */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bg-[#E8DCC8] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] 
                   px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 
                   top-[85%] sm:top-[88%] md:top-[90%] rounded-lg shadow-lg z-10"
      >
        <div className="max-w-4xl mx-auto text-center md:text-justify">
          {/* Section Title */}
          <h2
            className="mb-4 text-[24px] sm:text-[28px] md:text-[35px] leading-tight sm:leading-[45px] md:leading-[57px] text-center"
            style={{
              fontFamily: 'Arima Madurai, sans-serif',
              fontWeight: 700,
              color: '#000000',
            }}
          >
            | About Us |
          </h2>

          {/* Description */}
          <p
            className="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-relaxed sm:leading-[32px] md:leading-[38px] lg:leading-[42px]"
            style={{
              fontFamily: 'Arima Madurai, sans-serif',
              fontWeight: 500,
              color: '#000000',
            }}
          >
            Thiện Duyên thiết kế không gian{' '}
            <span
              style={{
                fontFamily: 'Berkshire Swash, cursive',
                fontWeight: 900,
              }}
            >
              Lễ Hằng Thuận
            </span>{' '}
            tinh tế, hài hòa giữa truyền thống và hiện đại, đảm bảo sự trang nghiêm
            của nghi lễ Phật giáo nhưng vẫn mang đến trải nghiệm sang trọng và đầy
            cảm xúc.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

