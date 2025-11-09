
import { useNavigate } from 'react-router-dom';

function CoordinatorQuotation() {
  const navigate = useNavigate();
     const sections = [
    {
      title: "Tư vấn chương trình",
      items: [
       "Tư vấn lựa chọn hình thức tổ chức, nghi lễ và phong cách phù hợp.",
        "Lên bảng kế hoạch tổng thể và phân công nhiệm vụ cho các bên.",
        "Trao đổi chi tiết qua Email, Điện thoại.",
      ],
    },
    {
      title: "Tư vấn ngân sách ",
      items: [
        "Tư vấn, phân bổ và hoàn thành ngân sách",
       "Đảm bảo concept phù hợp với địa điểm và ngân sách (theo gói dịch vụ)"
      ],
    },
    {
      title: "Đại diện cô dâu chú rể làm việc với bên đối tác",
      items: [
        "Xác nhận và tiếp quản công việc với đối tác",
        "Tư vấn, gợi ý đối tác nếu được yêu cầu"
      ],
    },
    {
      title: "Giám sát tất cả đối tác trong ngày diễn ra sự kiện ",
      items: [
       "Giám sát đối tác giai đoạn trước và trong đám cưới đảm bảo đối tác nắm rõ timeline"
      ],
    },
    {
      title: "Điều phối chương trình",
      items: [
        "Quản lý các công việc liên quan và được yêu cầu trong ngày cưới",
        "Giám sát, tổng duyệt trước sự kiện, phối hợp các bên đảm bảo chương trình diễn ra suôn sẻ"
      ],
    },
  ];
  return (
    <div className="w-full py-10">
    <div className="px-4 flex justify-center items-center ">
      <img src="https://res.cloudinary.com/dijayprrw/image/upload/v1760882979/Rectangle_4541_1_pyhc91.png" alt="Planning Quotation" 
      className="rounded-3xl"/>
    </div>
    <div className=" text-gray-800 px-6 sm:px-10 lg:px-20 py-16 leading-relaxed">
      <p className="text-[#9C4A3B] text-3xl font-medium mb-2 font-[Bellota]">Dịch vụ</p>
      <h1 className="text-4xl font-medium text-[#7C2E1D] mb-2 font-[Be Vietnam Pro]">ĐIỀU PHỐI</h1>
      <div className="w-full border-t border-gray-900 my-8"></div>
      <p className="mb-6 text-gray-700" style={{fontFamily: '"Arima Madurai", cursive', fontSize: '18px', lineHeight: '30px'}}>
        Tư vấn xây dựng kịch bản cưới và giúp bạn lo liệu, điều phối ngày cưới một cách hoàn hảo trọn vẹn nhất. 
      </p>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-bold text-gray-900 mb-2]"style={{fontFamily: '"Arima Madurai", cursive'}}>
              + {section.title}
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700" style={{fontFamily: '"Arima Madurai", cursive'}}>
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button 
          onClick={() => navigate('/contact')}
          className="bg-[#8B3E2E] hover:bg-[#6B2F22] text-white px-8 py-5 rounded-xl text-lg font-semibold shadow-md transition-all "
        >
          ĐĂNG KÍ TƯ VẤN NGAY
        </button>
      </div>
    </div>
    </div>
  )
}

export default CoordinatorQuotation
