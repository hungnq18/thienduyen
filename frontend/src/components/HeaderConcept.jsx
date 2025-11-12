const HeaderConcept = () => {
  return (
    <section className="w-full bg-[#F6EFE7] pt-0 sm:pt-0 md:pt-0 lg:pt-0 pb-16 sm:pb-20 md:pb-28 lg:pb-32">
      <div className="relative w-full">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1762948668/Rectangle_4493_1_oe74tj.png"
          alt="Lễ Hằng Thuận Thiện Duyên"
          className="w-full object-cover max-h-[540px] h-[240px] sm:h-[300px] md:h-auto"
          loading="lazy"
        />

        <div className="w-[82%] max-w-[320px] sm:w-[78%] sm:max-w-none md:w-[70%] lg:w-[60%] bg-[#DFD2C2] shadow-lg mx-auto mt-5 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-[-60px]">
          <div className="px-4 sm:px-7 md:px-10 py-5 sm:py-7 md:py-9">
            <p
              className="text-sm sm:text-base md:text-xl leading-relaxed text-justify"
              style={{ fontFamily: 'Arima Madurai, sans-serif', color: '#2F1B12' }}
            >
              Thiện Duyên thiết kế không gian <span className="font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>Lễ Hằng Thuận</span> tinh tế,
              hài hòa giữa truyền thống và hiện đại, đảm bảo sự trang nghiêm của nghi lễ Phật giáo nhưng vẫn mang đến trải nghiệm sang trọng và đầy cảm xúc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderConcept;
  