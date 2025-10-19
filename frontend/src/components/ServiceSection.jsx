
const ServiceSection = () => {
    return (
        <div className="relative w-full">
            {/* Background Image Container */}
            <div className="relative left-0 w-full h-[auto]">
                <img 
                    src="https://res.cloudinary.com/dijayprrw/image/upload/v1760732051/anh-le-hang-thuan-cua-tram-anh-the-phiet-gia-toc-kim-son-va-gia-toc-nguyen-luu-dung-dinh-cua-quy-toc-11-1712289633_1_nyclfi.png" 
                    alt="Service Header Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Overlay - Outside Image (updated to match provided design) */}
            <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-[#FDF6EE] py-8 px-6 z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-4">
                        <div className="text-md pb-3 px-6 text-gray-700" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>Timeless Echoes of</div>
                        <h2 style={{
                            fontFamily: 'Berkshire Swash, cursive',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '50px',
                            lineHeight: '62px',
                            textAlign: 'center',
                            color: '#000000',
                            width: '873px',
                            height: '62px',
                            margin: '0 auto',
                            display: 'block'
                        }}>Sacred Moments We've Shared</h2>
                        <div style={{
                            fontFamily: 'Arizonia, cursive',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '27px',
                            lineHeight: '34px',
                            textAlign: 'center',
                            color: '#000000',
                            display: 'block',
                            marginTop: '8px'
                        }}>And Journeys We've Blessed</div>
                    </div>

                    {/* Two-column Vietnamese content to match the image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
                        <div style={{ fontFamily: 'Arima Madurai, sans-serif', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '36px', textAlign: 'justify', color: '#000000' }}>
                            Tại Thiện Duyên, chúng tôi luôn đặt tâm huyết vào việc mang đến cho đôi uyên ương một lễ Hằng Thuận trang nghiêm, thiêng liêng nhưng vẫn trọn vẹn hạnh phúc. Với chúng tôi, mỗi buổi lễ không chỉ là một nghi thức, mà còn là dấu ấn mở đầu cho hành trình gắn bó dài lâu của hai người.
                        </div>

                        <div style={{ fontFamily: 'Arima Madurai, sans-serif', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '36px', textAlign: 'justify', color: '#000000' }}>
                            Chúng tôi hạnh phúc khi được lắng nghe những ước nguyện, niềm tin và cả nỗi lo lắng của gia đình đôi bên trước ngày trọng đại. Mỗi Lễ Hằng Thuận là một trải nghiệm tinh thần sâu sắc, nơi tình yêu được chúc phúc, niềm tin được vun bồi, và cảm xúc được thăng hoa. Dù là trong không gian truyền thống hay hiện đại, Thiện Duyên luôn đồng hành, biến từng khoảnh khắc trở thành ký ức đáng nhớ, thiêng liêng và đầy cảm xúc.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceSection;

