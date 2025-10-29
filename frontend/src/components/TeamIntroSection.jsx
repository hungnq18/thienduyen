const members = [
  {
    name: 'Nguyen Dieu Linh',
    role: 'Chief Executive Officer',
    avatar:
      'https://res.cloudinary.com/dijayprrw/image/upload/v1761729835/Rectangle_4576_nxijmm.png',
    bio:
      'Là người luôn ấp ủ mong muốn gìn giữ và lan tỏa những giá trị văn hóa Việt trong đời sống hiện đại, cô định hình tầm nhìn phát triển bền vững cho Thiện Duyên – một không gian nơi nghi lễ và giá trị nhân bản hòa quyện. Với sự tinh tế và thấu hiểu, Linh đặt con người làm trung tâm cho mọi hoạt động và trải nghiệm, kiến tạo một hành trình kết nối, giúp đôi uyên ương khởi đầu chặng đường mới trọn vẹn và an yên.'
  },
  {
    name: 'Nguyen Thanh Tra',
    role: 'Chief Financial Officer',
    avatar:
      'https://res.cloudinary.com/dijayprrw/image/upload/v1761730144/Rectangle_4577_vbnnsh.png',
    bio:
      'Giữ vai trò “người giữ nhịp” tài chính tại Thiện Duyên, Trà mang đến cân bằng giữa giá trị tinh thần và vận hành thực tiễn. Tư duy vững và kỹ luật cao bảo chứng cho từng nguồn lực được sử dụng hiệu quả, bền vững, đảm bảo mỗi buổi lễ đều được tổ chức chỉnh chu, trọn vẹn và yên bình.'
  },
  {
    name: 'Hoang Lan Phuong',
    role: 'Partner Relationship Management',
    avatar:
      'https://res.cloudinary.com/dijayprrw/image/upload/v1761730252/Rectangle_4578_wfyltw.png',
    bio:
      'Là cầu nối giữa Thiện Duyên và các đối tác – cô xem mỗi mối quan hệ là một hành duyên đáng quý. Sự chân thành, thấu hiểu và tinh tế giúp Lan Phương mang lại hợp tác bền vững, hiệu quả, đồng thời dựng xây mạng lưới tin cậy để mỗi buổi lễ luôn được chuẩn bị chu đáo đến từng chi tiết.'
  },
  {
    name: 'Vo Thu Ha',
    role: 'Chief Marketing Officer',
    avatar:
      'https://res.cloudinary.com/dijayprrw/image/upload/v1761730400/Rectangle_4579_gc1avv.png',
    bio:
      'Mang tinh thần sáng tạo và yêu thích giá trị văn hóa, Hà kể những câu chuyện thương hiệu truyền cảm hứng về Lễ Hằng Thuận theo cách gần gũi, hiện đại. Mỗi chiến dịch đều được cô xây dựng bằng sự thấu cảm và tinh tế – để mọi khoảnh khắc đều chạm đến trái tim người đón nhận.'
  },
  {
    name: 'Pham Quynh Ly',
    role: 'Chief Commercial Officer',
    avatar:
      'https://res.cloudinary.com/dijayprrw/image/upload/v1761730519/Rectangle_4580_ahprum.png',
    bio:
      'Với tư duy dịch vụ hướng đến giá trị bền vững, Quỳnh Ly chú trọng từng trải nghiệm của khách hàng – từ lắng nghe đến đồng hành trong suốt hành trình chuẩn bị lễ cưới. Cô tin rằng sự an tịnh và tử tế trong phục vụ chính là nền tảng của một ngày trọng đại trọn vẹn.'
  }
];

const TeamIntroSection = () => {
  return (
    <section className="w-full bg-[#FDF6EE] pt-12 sm:pt-16 md:pt-20 pb-14 sm:pb-18 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16">
          {members.map((m) => (
            <div key={m.name} className="grid grid-cols-[34%_1fr] sm:grid-cols-[30%_1fr] md:grid-cols-[26%_1fr] gap-6 sm:gap-8 items-start">
              <div className="w-full h-full min-h-[170px] sm:min-h-[240px] md:min-h-[280px]">
                <img src={m.avatar} alt={m.name} className="w-full h-full object-cover rounded" />
              </div>
              <div>
                <h4 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold leading-snug" style={{ fontFamily: 'Akatab, sans-serif', color: '#000' }}>
                  {m.name} - {m.role}
                </h4>
                <p className="mt-3 text-justify text-[16px] sm:text-[18px] md:text-[20px] leading-8 md:leading-9" style={{ fontFamily: 'Arima Madurai, sans-serif', color: '#000' }}>
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamIntroSection;


