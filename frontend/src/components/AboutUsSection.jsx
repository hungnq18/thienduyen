import React from 'react';

const AboutUsSection = () => {
    return (
        <div className="relative w-full">
            {/* Background Image Container */}
            <div className="relative top-0 left-0 w-full h-[auto]">
                <img 
                    src="https://res.cloudinary.com/dijayprrw/image/upload/v1760690908/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_11_1_rtaksi.png" 
                    alt="About Us Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Overlay - Outside Image */}
            <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 w-5/6 bg-[#E8DCC8] py-6 px-4 z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Section Title */}
                    <h2 className="text-center mb-4 text-[35px] leading-[57px]" style={{ fontFamily: 'Arima Madurai, sans-serif', fontWeight: 700, color: '#000000' }}>
                        | About Us |
                    </h2>

                    {/* Description */}
                    <p className="text-justify text-[28px] leading-[42px]" style={{ fontFamily: 'Arima Madurai, sans-serif', fontWeight: 500, color: '#000000' }}>
                        Thiện Duyên thiết kế không gian <span style={{ fontFamily: 'Berkshire Swash, cursive', fontWeight: 900 }}>Lễ Hằng Thuận</span> tinh tế, hài hòa giữa truyền thống và hiện đại, đảm bảo sự trang nghiêm của nghi lễ Phật giáo nhưng vẫn mang đến trải nghiệm sang trọng và đầy cảm xúc.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;

