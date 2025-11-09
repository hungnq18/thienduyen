import { ChevronDown } from 'lucide-react';

/**
 * Reusable component for displaying quotation packages with customizable options
 * @param {string} title - Section title
 * @param {Array} packages - Array of package objects with {id, name, image, link?}
 * @param {boolean} showScrollDown - Show scroll down icon
 * @param {Function} onPackageClick - Callback when package is clicked
 * @param {string} buttonColor - Button background color
 * @param {string} buttonHoverColor - Button hover color
 * @param {string} backgroundColor - Section background color
 * @param {boolean} showBorders - Show side borders
 * @param {'2-1'|'grid'} layout - Layout type: '2-1' (2 top, 1 bottom) or 'grid' (all in grid)
 * @param {string} imageHeight - Tailwind classes for image height
 */
const DecorationResortHeader = ({
  title = 'BÁO GIÁ DỊCH VỤ TRANG TRÍ  LỄ HẰNG THUẬN TẠI RESORT',
  packages = [],
  showScrollDown = true,
  onPackageClick,
  buttonColor = '#610912',
  buttonHoverColor = '#7a0f18',
  backgroundColor = '#FDF6EE',
  showBorders = true,
  layout = '2-1', // '2-1' for 2 top, 1 bottom | 'grid' for all in grid
  imageHeight = 'h-[300px] md:h-[400px]',
}) => {
  const handlePackageClick = (pkg) => {
    if (onPackageClick) {
      onPackageClick(pkg);
    }
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const firstSection = document.getElementById('traditional-section');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to next section
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // Default packages if none provided
  const defaultPackages = [
    {
      id: 1,
      name: 'GÓI MODERN ZEN',
      image: 'https://res.cloudinary.com/dijayprrw/image/upload/v1760881159/Rectangle_4543_h93ehc.png',
      link: null,
    },
    {
      id: 2,
      name: 'GÓI ELEGANT CONTEMPORARY',
      image: 'https://res.cloudinary.com/dijayprrw/image/upload/v1761791502/image_14_jeb4ab.png',
      link: null,
    },
    {
      id: 3,
      name: 'GÓI NATURE FUSION',
      image: 'https://res.cloudinary.com/dijayprrw/image/upload/v1761791584/image_15_wlhjyo.png',
      link: null,
    },
  ];

  const displayPackages = packages.length > 0 ? packages : defaultPackages;

  const renderPackageCard = (pkg) => (
    <div
      key={pkg.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.name}
          className={`w-full ${imageHeight} object-cover`}
        />
      </div>
      <div className="p-4 md:p-6 text-center">
        {pkg.link ? (
          <a
            href={pkg.link}
            className="w-full block text-white font-bold text-lg md:text-xl py-3 md:py-4 rounded-lg transition-colors uppercase tracking-wide"
            style={{
              backgroundColor: buttonColor,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonColor)}
          >
            {pkg.name}
          </a>
        ) : (
          <button
            onClick={() => handlePackageClick(pkg)}
            className="w-full text-white font-bold text-lg md:text-xl py-3 md:py-4 rounded-lg transition-colors uppercase tracking-wide"
            style={{
              backgroundColor: buttonColor,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonColor)}
          >
            {pkg.name}
          </button>
        )}
      </div>
    </div>
  );

  if (layout === 'grid') {
    // All packages in a grid
    return (
      <section
        className="relative py-12 md:py-16 px-4 md:px-8"
        style={{ backgroundColor }}
      >
        {showBorders && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-200"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-200"></div>
          </>
        )}

        <div className="max-w-7xl mx-auto">
          {title && (
            <div className="text-center mb-12 md:mb-16">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 uppercase tracking-tight"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                {title}
              </h1>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayPackages.map(renderPackageCard)}
          </div>

          {showScrollDown && (
            <div className="flex justify-center mt-12 md:mt-16">
              <div
                className="rounded-full p-3 transition-colors cursor-pointer animate-bounce"
                style={{ backgroundColor: buttonColor }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonColor)}
                onClick={handleScrollDown}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleScrollDown(e);
                  }
                }}
              >
                <ChevronDown size={24} className="text-white pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default layout: 2 top, 1 bottom (2-1)
  return (
    <section
      className="relative py-12 md:py-16 px-4 md:px-8"
      style={{ backgroundColor }}
    >
      {showBorders && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-200"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-200"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-12 md:mb-16">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 uppercase tracking-tight"
              style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              {title}
            </h1>
          </div>
        )}

        {/* First two packages - side by side */}
        {displayPackages.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {displayPackages.slice(0, 2).map(renderPackageCard)}
          </div>
        )}

        {/* Third package - centered below */}
        {displayPackages.length >= 3 && (
          <div className="max-w-[600px] mx-auto">
            {renderPackageCard(displayPackages[2])}
          </div>
        )}

        {/* Additional packages in grid if more than 3 */}
        {displayPackages.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
            {displayPackages.slice(3).map(renderPackageCard)}
          </div>
        )}

        {showScrollDown && (
          <div className="flex justify-center mt-12 md:mt-16">
            <div
              className="rounded-full p-3 transition-colors cursor-pointer animate-bounce"
              style={{ backgroundColor: buttonColor }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonColor)}
            >
              <ChevronDown size={24} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DecorationResortHeader;

