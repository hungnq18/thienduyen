import React from 'react';

const AboutApproach = () => {
    return (
        <div className="w-full pt-60">
            <div className="max-w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 pl-20">
                        {/* Title */}
                        <h2 className="text-[60px] leading-[70px] mb-10" style={{ fontFamily: 'Berkshire Swash, cursive', fontWeight: 400, color: '#000000' }}>
                            Our Approach
                        </h2>

                        {/* Paragraph 1 */}
                        <p className="pt-2 text-justify text-[30px] leading-[49px]" style={{ fontFamily: 'Arima Madurai, sans-serif', fontWeight: 500, color: '#000000' }}>
                            Tại Thiện Duyên, chúng tôi tạo nên những nghi lễ <span style={{ fontFamily: 'Berkshire Swash, cursive' }}>Lễ Hằng Thuận</span> ý nghĩa, kết hợp giữa truyền thống Phật giáo và nét thanh lịch hiện đại.
                        </p>

                        {/* Paragraph 2 */}
                        <p className="text-justify text-[30px] leading-[49px]" style={{ fontFamily: 'Arima Madurai, sans-serif', fontWeight: 500, color: '#000000' }}>
                            Chúng tôi tập trung vào việc thấu hiểu tầm nhìn của mỗi cặp đôi, cân bằng giữa tâm linh và cá tính để tạo nên một lễ cưới vừa thiêng liêng vừa mang tính cá nhân.
                        </p>

                        {/* Paragraph 3 */}
                        <p className="text-justify text-[30px] leading-[49px]" style={{ fontFamily: 'Arima Madurai, sans-serif', fontWeight: 500, color: '#000000' }}>
                            Hơn cả một dịch vụ, chúng tôi xây dựng những kết nối chân thành để đảm bảo mỗi khoảnh khắc đều trở thành một phước lành vượt thời gian.
                        </p>
                    </div>

                    {/* Right Image - Full width to edge */}
                    <div className="relative w-full">
                        <img 
                            src="https://res.cloudinary.com/dijayprrw/image/upload/v1760692623/847bf83be2d652db3d9f5e0fcb1c30ca_1_x3rnuu.png" 
                            alt="Our Approach"
                            className="w-full h-[auto] object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutApproach;

