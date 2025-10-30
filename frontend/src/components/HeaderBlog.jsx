const HeaderBlog = () => {
  return (
    <section className="w-full pt-0">
      <div className="w-full">
        <div className="relative w-full h-[480px] sm:h-[540px] md:h-[640px] lg:h-[720px] pb-14 sm:pb-16 md:pb-20">
          <img
            src="https://res.cloudinary.com/dijayprrw/image/upload/v1761790148/Thie%CC%82%CC%81t_ke%CC%82%CC%81_chu%CC%9Ba_co%CC%81_te%CC%82n_3_1_wecf9s.png"
            alt="Blog hero"
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />

          {/* Quote card overlay */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[28%] sm:translate-y-[24%] md:translate-y-[20%] lg:translate-y-[20%] w-fit max-w-[96%] sm:max-w-[90%] md:max-w-[76%] lg:max-w-[74%]">
            <div className="bg-[#D9D9D9] text-[#000] rounded-md px-5 sm:px-7 md:px-10 lg:px-12 py-5 sm:py-6 md:py-7 w-fit">
              <div className="space-y-1 text-center">
                <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] leading-relaxed font-semibold" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                  "Written by The Planners, this blog page is a reliable source
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] leading-relaxed font-semibold" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                  that gives you helpful information for planning a wedding."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderBlog;


