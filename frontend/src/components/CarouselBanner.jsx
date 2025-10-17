import React, { useEffect, useState } from 'react';

const CarouselBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    "https://res.cloudinary.com/dijayprrw/image/upload/v1760675441/Rectangle_4640_inlubx.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/v1760680469/Frame_1000003017_1_hyjp7h.png", 
    "https://res.cloudinary.com/dijayprrw/image/upload/v1760680682/Group_1000003018_zhmc9y.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/v1760680778/Group_1000003019_jtlax3.png",
    "https://res.cloudinary.com/dijayprrw/image/upload/v1760680856/Group_1000003020_skz0k8.png"
  ];

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[800px] overflow-hidden">
      {/* Image Slides */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <div 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors z-20 cursor-pointer bg-gray-600/50 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors z-20 cursor-pointer bg-gray-600/50 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-[40000ms] ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / images.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default CarouselBanner;
