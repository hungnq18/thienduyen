import React from 'react';
import AboutBanner from '../components/AboutBanner';
import AboutUsHeader from '../components/AboutUsHeader';
import OurBestTeam from '../components/OurBestTeam';
import TeamIntroSection from '../components/TeamIntroSection';

const AboutPage = () => {
  return (
    <div className="about-page">
      <AboutBanner />
      <AboutUsHeader />
      <OurBestTeam />
      <TeamIntroSection />
    </div>
  );
};

export default AboutPage;
