const AboutUsHeader = () => {
  return (
    <section className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-10 items-start">
          {/* Left: Hero Image with overlay quote card */}
          <div className="relative w-full lg:mt-24 xl:mt-28">
            <img
              src="https://res.cloudinary.com/dijayprrw/image/upload/v1761727569/Rectangle_4569_mcukhv.png"
              alt="Thiện Duyên Ceremony"
              className="w-full h-auto object-cover rounded-md"
              loading="lazy"
            />

          </div>

          {/* Right: Headings and intro text */}
          <div className="px-0 sm:px-1 md:px-2 lg:px-4 lg:mt-12">
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] leading-tight mb-2" style={{ fontFamily: 'Berkshire Swash, cursive', color: '#000' }}>
              Hi grooms and brides!
            </h2>
            <h3 className="text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] leading-tight mb-6" style={{ fontFamily: 'Berkshire Swash, cursive', color: '#000' }}>
              We are Thien Duyen Team.
            </h3>
            <div className="space-y-0">
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-justify" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                Từ những người trẻ mang trong mình tình yêu với văn hóa truyền thống và niềm tin vào giá trị của sự an yên, chúng tôi cùng nhau tạo nên Thiện Duyên – một dự án cung cấp dịch vụ Lễ Hằng Thuận linh hoạt tại chùa hoặc resort, nơi tình yêu được gắn kết dưới ánh sáng của đạo và đời.
              </p>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-justify" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                Chẳng chỉ tín ngưỡng, mỗi lễ cưới không chỉ là ngày hạnh phúc, mà còn là hành trình hướng về cội nguồn, tri ân cha mẹ và vun bồi nhân duyên thiện lành. Với góc nhìn trẻ, Thiện Duyên mong muốn mang đến những buổi lễ trang nghiêm và đầy yêu thương, cảm xúc và không gian – nơi mọi chi tiết đều thấm đẫm giá trị văn hóa Việt Nam, tinh tế và thẩm mỹ.
              </p>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-justify" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                Qua sự kết hợp giữa giá trị lễ Phật giáo trang nghiêm và phong cách tổ chức hiện đại, chúng tôi tạo nên những trải nghiệm chuẩn mực, chạm đến trái tim, ấm áp và gần gũi, phù hợp với nhiều phong cách cưới theo tinh thần An – Hỷ.
              </p>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-justify" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                Thay cho lời chúc phúc, chúng tôi gửi đến bạn một hành trình khởi đầu đầy dịu lành.
              </p>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
                Trân trọng,<br /><span className="font-semibold">Thiện Duyên Team.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHeader;


