import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="flex flex-col">
            {/* Service Image - Separate Card */}
            <div className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-[28rem] overflow-hidden">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Service Content - Separate Card */}
            <div className="p-4 -mt-8 relative z-10 mx-4 w-80 h-80 flex flex-col" style={{ backgroundColor: '#FDF6EE' }}>
                {/* Service Title */}
                <h3 className="text-[34px] leading-[37px] text-black mb-2 text-center whitespace-pre-line" style={{ fontFamily: 'Belanosima, sans-serif', fontWeight: 400 }}>
                    {service.title.split(' ').slice(0, 2).join('\n')}
                </h3>

                {/* Service Description */}
                <p className="text-gray-700 text-[15px] leading-[17px] text-justify mb-2 mt-2 flex-grow flex items-center justify-center px-4" style={{ fontFamily: 'Arimo, sans-serif', fontWeight: 400, color: '#000000' }}>
                    {service.description}
                </p>

                {/* Read More Button */}
                <button className="mx-auto transition-colors duration-300 uppercase border-2 text-[32px] leading-[38px]" style={{ backgroundColor: '#610912', color: '#FFFFFF', borderColor: '#610912', borderRadius: '0', fontFamily: 'Bebas Neue, sans-serif', fontWeight: 200, width: '200px', height: '45px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.05em' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#610912'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#610912'; e.currentTarget.style.color = '#FFFFFF'; }}>
                   <span className="text-[25px] leading-[30px]" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 200, letterSpacing: '0.05em' }}>XEM THÊM</span>
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
