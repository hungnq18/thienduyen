import layout from '../assets/layout.png';

const OurBestTeam = () => {
  return (
    <section className="w-full bg-[#FDF6EE] pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Headings */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="leading-tight"
            style={{
              fontFamily: 'Belanosima, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 'clamp(32px, 6vw, 70px)',
              lineHeight: 'clamp(40px, 7vw, 77px)',
              color: '#000000',
              display: 'block',
              width: '100%',
              maxWidth: '524px'
            }}
          >
            OUR BEST TEAM
          </h2>
          <p
            className="mt-2"
            style={{
              boxSizing: 'border-box',
              fontFamily: 'Alegreya, serif',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 'clamp(18px, 3.2vw, 30px)',
              lineHeight: 'clamp(26px, 4.6vw, 41px)',
              color: '#000000',
              display: 'block',
              width: '100%',
              maxWidth: '524px',
              minHeight: '41px'
            }}
          >
            THIEN DUYEN WEDDING & EVENT PLANNER
          </p>
        </div>

        <div className="w-full">
          <img src={layout} alt="Our Best Team Layout" className="w-full h-auto object-cover rounded" />
        </div>

        {/* bottom separator */}
        <div className="mt-8 sm:mt-10 md:mt-12 border-t border-black/20" />
      </div>
    </section>
  );
};

export default OurBestTeam;


