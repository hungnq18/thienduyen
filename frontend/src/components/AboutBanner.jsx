const AboutBanner = () => {
  return (
    <section className="relative w-full -mt-6 md:-mt-8 lg:-mt-10">
      {/* Full-width hero image */}
      <img
        src="https://res.cloudinary.com/dijayprrw/image/upload/v1761726017/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_10_1_1_zfdted.png"
        alt="Thien Duyen Banner"
        className="w-full h-auto object-cover"
        loading="lazy"
      />

      {/* Overlay caption card bottom-left */}
      <div className="absolute left-5 sm:left-10 lg:left-[77px] bottom-[-28px] sm:bottom-[-20px] lg:bottom-[-24px] bg-[#FDF6EE] text-black rounded-md w-[92%] sm:w-[80%] lg:w-[695px] p-4 sm:p-6 lg:p-7 text-center"
           style={{ height: 'auto' }}>
        <p className="text-[11px] sm:text-[12px] lg:text-[13px] tracking-[0.18em] text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          THIEN DUYEN WEDDING & EVENT PLANNER
        </p>
        <p className="text-black text-center px-2 sm:px-4" style={{
          fontFamily: 'Anton SC, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 'clamp(22px, 5vw, 40px)',
          lineHeight: 'clamp(32px, 7vw, 60px)',
          display: 'inline-block',
          width: '100%',
          maxWidth: '695px'
        }}>
          TOGETHER IN LOVE, WE SHARE PEACE AND HAPPINESS.
        </p>
      </div>
    </section>
  );
};

export default AboutBanner;


