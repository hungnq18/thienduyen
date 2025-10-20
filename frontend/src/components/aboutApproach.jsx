
const AboutApproach = () => {
  return (
    <section className="w-full pt-60 sm:pt-60 md:pt-52 lg:pt-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:pl-10 lg:pl-20 md:pt-10 lg:pt-16">
            {/* Title */}
            <h2
              className="text-[26px] sm:text-[36px] md:text-[48px] lg:text-[60px] leading-tight md:leading-[65px] lg:leading-[70px] mb-6 sm:mb-8 md:mb-10 text-center md:text-left"
              style={{
                fontFamily: "Berkshire Swash, cursive",
                fontWeight: 400,
                color: "#000000",
              }}
            >
              Our Approach
            </h2>

            {/* Paragraph 1 */}
            <p
              className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[28px] leading-relaxed sm:leading-[32px] md:leading-[40px] lg:leading-[46px] text-justify px-2 sm:px-0"
              style={{
                fontFamily: "Arima Madurai, sans-serif",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Tại Thiện Duyên, chúng tôi tạo nên những nghi lễ{" "}
              <span style={{ fontFamily: "Berkshire Swash, cursive" }}>
                Lễ Hằng Thuận
              </span>{" "}
              ý nghĩa, kết hợp giữa truyền thống Phật giáo và nét thanh lịch
              hiện đại.
            </p>

            {/* Paragraph 2 */}
            <p
              className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[28px] leading-relaxed sm:leading-[32px] md:leading-[40px] lg:leading-[46px] text-justify px-2 sm:px-0"
              style={{
                fontFamily: "Arima Madurai, sans-serif",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Chúng tôi tập trung vào việc thấu hiểu tầm nhìn của mỗi cặp đôi,
              cân bằng giữa tâm linh và cá tính để tạo nên một lễ cưới vừa
              thiêng liêng vừa mang tính cá nhân.
            </p>

            {/* Paragraph 3 */}
            <p
              className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[28px] leading-relaxed sm:leading-[32px] md:leading-[40px] lg:leading-[46px] text-justify px-2 sm:px-0"
              style={{
                fontFamily: "Arima Madurai, sans-serif",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Hơn cả một dịch vụ, chúng tôi xây dựng những kết nối chân thành để
              đảm bảo mỗi khoảnh khắc đều trở thành một phước lành vượt thời
              gian.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full">
            <img
              src="https://res.cloudinary.com/dijayprrw/image/upload/v1760692623/847bf83be2d652db3d9f5e0fcb1c30ca_1_x3rnuu.png"
              alt="Our Approach"
              className="w-full h-auto object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
