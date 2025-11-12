const ConceptServiceSection = ({
  title = "DỊCH VỤ TRANG TRÍ TIỆC CƯỚI CỦA THIỆN DUYÊN",
  description = "Thiện Duyên xin giới thiệu tới bạn các gói dịch vụ trang trí đáp ứng được mọi nhu cầu về ngân sách đặc biệt còn thể hiện được tính cá nhân của cặp đôi.",
  concepts = [],
  viewMoreButton = {
    text: "XEM THÊM",
    onClick: () => {}
  }
}) => {
  return (
    <section className="w-full bg-[#F6EFE7] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Main Title */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-6 sm:mb-8 md:mb-10"
          style={{
            fontFamily: "Be Vietnam Pro, sans-serif",
            color: "#6B2C1B"
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="text-sm sm:text-base md:text-lg text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto leading-relaxed"
          style={{
            fontFamily: "Be Vietnam Pro, sans-serif",
            color: "#000000"
          }}
        >
          {description}
        </p>

        {/* Concepts List */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 relative">
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-[50%_50%] gap-6 sm:gap-8 md:gap-10 items-stretch ${
                idx === 0 ? 'relative' : ''
              }`}
            >
              {/* Left: Text Card */}
              <div 
                className={`bg-white p-6 sm:p-8 md:p-10 shadow-md rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl h-full flex flex-col ${
                  idx === 0 ? 'concept-traditional-card' : ''
                }`}
              >
                <h3
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 md:mb-6"
                  style={{
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    color: "#6B2C1B"
                  }}
                >
                  {concept.title}
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base leading-relaxed text-justify"
                  style={{
                    fontFamily: "'Arima Madurai', sans-serif",
                    color: "#000000"
                  }}
                >
                  {concept.description}
                </p>
              </div>

              {/* Right: Image */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-xs sm:max-w-sm flex-1 aspect-[4/3] max-h-[280px] sm:max-h-[320px] rounded-lg sm:rounded-xl overflow-hidden shadow-md">
                  <img
                    src={concept.image}
                    alt={concept.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {viewMoreButton && (
          <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
            <button
              onClick={viewMoreButton.onClick}
              className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-[#700304] text-white rounded-lg font-bold uppercase text-sm sm:text-base md:text-lg hover:bg-[#5a0203] transition-colors shadow-md hover:shadow-lg"
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif"
              }}
            >
              {viewMoreButton.text}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConceptServiceSection;

