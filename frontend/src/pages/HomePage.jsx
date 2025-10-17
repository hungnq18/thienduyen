import React from 'react';
import AboutApproach from '../components/aboutApproach';
import AboutUsSection from '../components/AboutUsSection';
import CarouselBanner from '../components/CarouselBanner';
import LoveTraditionSection from '../components/LoveTraditionSection';
import ServiceHomeSection from '../components/ServiceHomeSection';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Carousel Banner */}
      <CarouselBanner />
      
      {/* Service Home Section */}
      <ServiceHomeSection />
      
      {/* About Us Section */}
      <AboutUsSection />
      
      {/* About Approach Section */}
      <AboutApproach />
      
      {/* Love Tradition Section */}
      <LoveTraditionSection />
    </div>
  );
};

export default HomePage;
