import { useNavigate } from 'react-router-dom';
import ConceptServiceSection from './ConceptServiceSection';

// Example usage of ConceptServiceSection component
const ConceptServiceSectionExample = () => {
  const navigate = useNavigate();

  const concepts = [
    {
      title: "1. Concept Truyền thống Phật giáo",
      description: "Không gian thiêng liêng, mang đậm dấu ấn nghi lễ Hằng Thuận. Màu nâu – vàng trầm ấm gợi sự tôn nghiêm và an lành.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965091/Rectangle_4503_t89kbd.png",
      showSwipeIndicator: true
    },
    {
      title: "2. Concept Thiền – Tối giản",
      description: "Tối giản nhưng tinh tế, sử dụng tông màu nhẹ nhàng, mang đến cảm giác an yên và sâu lắng.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965133/Rectangle_4503_1_wvurrh.png",
      showSwipeIndicator: true
    },
    {
      title: "3. Concept Sen - Biểu tượng Tình yêu thuần khiết",
      description: "Lấy cảm hứng từ hoa sen – biểu tượng của tình yêu trong sáng. Không gian nhẹ nhàng, thanh khiết và tràn đầy ý nghĩa.",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1762965186/Rectangle_4503_2_wesq0r.png",
      showSwipeIndicator: true
    }
  ];

  const handleViewMore = () => {
    // Navigate to a page or perform an action
    navigate('/concepts');
    // or window.scrollTo(0, 0);
  };

  return (
    <ConceptServiceSection
      title="DỊCH VỤ TRANG TRÍ TIỆC CƯỚI CỦA THIỆN DUYÊN"
      description="Thiện Duyên xin giới thiệu tới bạn các gói dịch vụ trang trí đáp ứng được mọi nhu cầu về ngân sách đặc biệt còn thể hiện được tính cá nhân của cặp đôi."
      concepts={concepts}
      viewMoreButton={{
        text: "XEM THÊM",
        onClick: handleViewMore
      }}
    />
  );
};

export default ConceptServiceSectionExample;

