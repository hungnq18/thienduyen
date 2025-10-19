import ServiceCard from './ServiceCard';

const ServiceHomeSection = () => {
  const services = [
    {
      id: 1,
      title: "Planning Service",
      description: "Thiện Duyên đồng hành cùng đôi uyên ương từ khâu chuẩn bị điên ngày cưới, mang đến kế hoạch chu toàn và giảm bớt gánh nặng, đề hành trình bước vào hôn nhân trở nên nhẹ nhàng và thiêng liêng.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1760689632/cbe3e0b98abc5538ce7b7530a552d2ed_1_hezxek.png",
    },
    {
      id: 2,
      title: "Decoration Service", 
      description: "Thiên Duyên thiết kế không gian Lễ Hằng Thuận tình tế, hài hòa giữa truyền thống và hiện đại, đảm bảo sự trang nghiêm của nghi lễ Phật giáo nhưng vẫn mang đến trải nghiệm sang trọng và đầy cảm xúc.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1760689782/07f9a8323a59dbf9054939a1ed1b237a_1_eunjbm.png",
    },
    {
      id: 3,
      title: "Coordination Service",
      description: "Đội ngũ Thiện Duyên chuyên nghiệp trong điều phối và giám sát, đầm bảo nghi lễ diễn ra suôn sẻ, giúp cô dâu chú rề và gia đình an tâm tận hưởng trọn vẹn ngày trong đại.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1760689861/anh-le-hang-thuan-cua-tram-anh-the-phiet-gia-toc-kim-son-va-gia-toc-nguyen-luu-dung-dinh-cua-quy-toc-18-1712289633_1_l2jeva.png",
    }
  ];

  return (
    <div className="w-full py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[70px] leading-[77px] text-black text-center" style={{ fontFamily: 'Belanosima, sans-serif', fontWeight: 400 }}>
            OUR SERVICE
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceHomeSection;
