const ServiceCategorySection = ({ 
  title, 
  categories = [], 
  ctaButton = { text: "ĐĂNG KÍ TƯ VẤN", onClick: () => {} },
  gridCols = 4 // Default 4 columns for resort, can be 3 for temple
}) => {
  // Determine grid classes based on gridCols prop
  const getGridClasses = () => {
    if (gridCols === 3) {
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    } else {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div className="w-full bg-[#F6EFE7] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Main Title */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-12 sm:mb-16 md:mb-20"
          style={{
            fontFamily: "Be Vietnam Pro, sans-serif",
            color: "#6B2C1B"
          }}
        >
          {title}
        </h2>

        {/* Categories Grid */}
        <div className={`${getGridClasses()} gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20`}>
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-[#FCF7F1] border-2 border-[#700304] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              style={{
                borderRadius: '18px 18px 18px clamp(40px, 8vw, 110px)'
              }}
            >
              {/* Category Image */}
              <div 
                className="w-full aspect-video overflow-hidden"
                style={{
                  borderTopLeftRadius: '18px'
                }}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3
                  className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-5"
                  style={{
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    color: "#6B2C1B"
                  }}
                >
                  {category.title}
                </h3>

                {/* Services List */}
                <ul className="space-y-2 sm:space-y-3 list-none mx-auto" style={{ maxWidth: '90%' }}>
                  {category.services.map((service, serviceIdx) => (
                    <li
                      key={serviceIdx}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <span
                        className="text-[#000000] flex-shrink-0 inline-flex items-center"
                        style={{ fontSize: "0.5rem" }}
                      >
                        •
                      </span>
                      <span
                        className="text-[10px] sm:text-xs leading-relaxed flex-1 text-justify"
                        style={{
                          fontFamily: "'Arima Madurai', sans-serif",
                          color: "#000000"
                        }}
                      >
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {ctaButton && (
          <div className="flex justify-center">
            <button
              onClick={ctaButton.onClick}
              className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-[#6B2C1B] text-white rounded-lg font-bold uppercase text-sm sm:text-base md:text-lg hover:bg-[#5a2415] transition-colors shadow-md hover:shadow-lg"
              style={{
                fontFamily: "Be Vietnam Pro, sans-serif"
              }}
            >
              {ctaButton.text}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategorySection;

