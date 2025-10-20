const ServiceSection = () => {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div className="relative left-0 w-full">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760732051/anh-le-hang-thuan-cua-tram-anh-the-phiet-gia-toc-kim-son-va-gia-toc-nguyen-luu-dung-dinh-cua-quy-toc-11-1712289633_1_nyclfi.png"
          alt="Service Header Background"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-[85%] sm:top-[82%] md:top-[80%] left-1/2 transform -translate-x-1/2 w-[90%] sm:w-11/12 md:w-3/4 bg-[#FDF6EE] py-6 sm:py-8 px-4 sm:px-6 z-10 rounded-xl shadow-md">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-4 sm:mb-6">
            <p
              className="text-gray-700 text-sm sm:text-base md:text-lg pb-2 sm:pb-3"
              style={{ fontFamily: "Arima Madurai, sans-serif" }}
            >
              Timeless Echoes of
            </p>
            <h2
              className="text-[26px] sm:text-[36px] md:text-[48px] lg:text-[50px] leading-tight md:leading-[62px] text-center mx-auto font-normal"
              style={{
                fontFamily: "Berkshire Swash, cursive",
                color: "#000000",
              }}
            >
              Sacred Moments We've Shared
            </h2>
            <p
              className="text-[20px] sm:text-[24px] md:text-[27px] leading-snug text-center mt-2 sm:mt-3"
              style={{
                fontFamily: "Arizonia, cursive",
                color: "#000000",
              }}
            >
              And Journeys We've Blessed
            </p>
          </div>

          {/* Two-column Vietnamese content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-4 sm:mt-6">
            <p
              className="text-[16px] sm:text-[18px] md:text-[20px] leading-[30px] sm:leading-[34px] md:leading-[36px] text-justify"
              style={{
                fontFamily: "Arima Madurai, sans-serif",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Tại Thiện Duyên, chúng tôi luôn đặt tâm huyết vào việc mang đến cho đôi uyên ương một lễ Hằng Thuận trang nghiêm, thiêng liêng nhưng vẫn trọn vẹn hạnh phúc. Với chúng tôi, mỗi buổi lễ không chỉ là một nghi thức, mà còn là dấu ấn mở đầu cho hành trình gắn bó dài lâu của hai người.
            </p>

            <p
              className="text-[16px] sm:text-[18px] md:text-[20px] leading-[30px] sm:leading-[34px] md:leading-[36px] text-justify"
              style={{
                fontFamily: "Arima Madurai, sans-serif",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Chúng tôi hạnh phúc khi được lắng nghe những ước nguyện, niềm tin và cả nỗi lo lắng của gia đình đôi bên trước ngày trọng đại. Mỗi Lễ Hằng Thuận là một trải nghiệm tinh thần sâu sắc, nơi tình yêu được chúc phúc, niềm tin được vun bồi, và cảm xúc được thăng hoa. Dù là trong không gian truyền thống hay hiện đại, Thiện Duyên luôn đồng hành, biến từng khoảnh khắc trở thành ký ức đáng nhớ, thiêng liêng và đầy cảm xúc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
