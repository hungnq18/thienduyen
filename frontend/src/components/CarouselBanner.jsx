import { useEffect, useState } from 'react';

const CarouselBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://res.cloudinary.com/dijayprrw/image/upload/f_auto,q_auto/v1760675441/Rectangle_4640_inlubx.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/f_auto,q_auto/v1760680469/Frame_1000003017_1_hyjp7h.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/f_auto,q_auto/v1760680682/Group_1000003018_zhmc9y.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/f_auto,q_auto/v1760680778/Group_1000003019_jtlax3.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/f_auto,q_auto/v1760680856/Group_1000003020_skz0k8.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 8000); // ⏩ giảm còn 8s mỗi slide
    return () => clearInterval(timer);
  }, [images.length]);

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[800px] overflow-hidden">
      {/* Slides */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Prev Button */}
      <button
        onClick={goToPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full text-white z-20"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full text-white z-20"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
        <div
          className="h-full bg-white transition-all duration-[8000ms] ease-linear"
          style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CarouselBanner;
