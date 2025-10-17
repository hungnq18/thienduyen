import React from 'react';
import logo from '../assets/thienduyen.svg';

const LoveTraditionSection = () => {
    return (
        <div className="w-full py-16">
            <div className="max-w-full mx-auto">
                {/* Top Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Left Image */}
                    <div className="overflow-hidden">
                        <img 
                            src="https://res.cloudinary.com/dijayprrw/image/upload/v1760693979/image_16_yxx2bp.png" 
                            alt="Traditional Wedding Setup"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    
                    {/* Right Image */}
                    <div className="overflow-hidden">
                        <img 
                            src="https://res.cloudinary.com/dijayprrw/image/upload/v1760694020/image_17_hv6whd.png" 
                            alt="Temple Wedding"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                </div>

                {/* Title Text */}
                <div className="text-center mb-8">
                    <h2 className="text-[90px] leading-[60px]" style={{ fontFamily: 'Ephesis, cursive', fontWeight: 900, color: '#000000' }}>
                        Love sealed in the beauty of tradition.
                    </h2>
                </div>

                {/* Bottom Large Image */}
                <div className="overflow-hidden mb-8">
                    <img 
                        src="https://res.cloudinary.com/dijayprrw/image/upload/v1760694128/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_13_1_fvvzmn.png" 
                        alt="Buddhist Wedding Ceremony"
                        className="w-full h-[auto] object-cover"
                    />
                </div>

                

                {/* Logo and Tagline */}
                <div className="text-center">
                    <div className="mb-4">
                        <img src={logo} alt="Thien Duyen Logo" className="mx-auto h-24 w-auto" />
                    </div>
                    {/* Divider Line */}
                <div className="flex justify-center mb-8">
                    <div className="border-t-2 border-gray-900" style={{ width: '331px', height: '3px' }}></div>
                </div>
                    <p className="text-[21px] leading-[30px] text-center" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400, color: '#000000' }}>
                        Where love finds peace, and vows are sealed in harmony
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoveTraditionSection;

