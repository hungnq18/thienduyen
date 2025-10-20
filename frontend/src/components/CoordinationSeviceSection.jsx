function DecorationSeviceSection() {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760801830/Rectangle_4481_uvgdwv.png"
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
              Coordination
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


      {/* Content Section */}
      <div className="flex flex-col md:flex-row w-5/6 mx-auto mt-4 md:mt-10 gap-4">
        <img
          src="https://res.cloudinary.com/dijayprrw/image/upload/v1760802313/Rectangle_4484_mrfxbz.png"
          alt="Decoration Service"
          className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto object-cover rounded-md"
        />

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-[#EBEBEB] text-center px-6 sm:px-10 py-8 sm:py-12 max-w-lg md:max-w-xl rounded-md">
            {/* Subtitle */}
            <p className="font-[Arima_Madurai] text-sm sm:text-base text-black opacity-90 mb-3">
              Gói dịch vụ
            </p>

            {/* Main Title */}
            <h2 className="font-[Beau_Rivage] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-6 sm:mb-8">
              Điều phối chương trình
            </h2>

            {/* Service List */}
            <ul className="font-[Arima_Madurai] text-sm sm:text-base md:text-lg text-left list-disc list-inside space-y-2 mb-6 sm:mb-10">
              <li>Tư vấn & lên ý tưởng kịch bản chương trình cưới</li>
              <li>Xây dựng timeline & quản lý xuyên suốt</li>
              <li>Quản lý âm thanh, ánh sáng, MC, hậu trường</li>
              <li>Điều phối nghi lễ & các hoạt động tâm linh</li>
              <li>Điều hành đội ngũ & các nhà cung cấp</li>
              <li>Xử lý phát sinh & kiểm soát rủi ro</li>
            </ul>

            {/* Contact Button */}
            <button
              className="transition-colors duration-300 uppercase border-2 border-[#610912] text-white bg-[#610912] font-[Bebas_Neue] text-base sm:text-lg px-6 py-2 sm:px-8 sm:py-3 hover:bg-white hover:text-[#610912]"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecorationSeviceSection;
