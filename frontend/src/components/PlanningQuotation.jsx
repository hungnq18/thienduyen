import { useNavigate } from "react-router-dom";

function PlanningQuotation() {
  const navigate = useNavigate();
     const sections = [
    {
      title: "Tư vấn chương trình",
      items: [
        "Lập bảng kế hoạch nhiệm vụ các bên",
        "Trao đổi công việc qua Email, Điện thoại",
      ],
    },
    {
      title: "Đại diện cô dâu chú rể làm việc với các bên đối tác",
      items: [
        "Tư vấn lựa chọn hình thức tổ chức, nghi lễ và phong cách phù hợp.",
        "Lên bảng kế hoạch tổng thể và phân công nhiệm vụ cho các bên.",
        "Trao đổi chi tiết qua Email, Điện thoại.",
      ],
    },
    {
      title: "Điều phối công việc",
      items: [
        "Lập bảng kế hoạch nhiệm vụ các bên",
        "Trao đổi công việc qua Email, Điện thoại",
      ],
    },
    {
      title: "Thiết lập ngân sách",
      items: [
        "Lập bảng kế hoạch nhiệm vụ các bên",
        "Trao đổi công việc qua Email, Điện thoại",
      ],
    },
    {
      title: "Timeline chi tiết",
      items: [
        "Lập bảng kế hoạch nhiệm vụ các bên",
        "Trao đổi công việc qua Email, Điện thoại",
      ],
    },
  ];
  return (
    <div className="w-full py-10">
    <div className="px-4 flex justify-center items-center ">
      <img src="https://res.cloudinary.com/dijayprrw/image/upload/v1760861011/Rectangle_4541_uvcoul.png" alt="Planning Quotation" 
      className="rounded-3xl"/>
    </div>
    <div className=" text-gray-800 px-6 sm:px-10 lg:px-20 py-16 leading-relaxed">
      <p className="text-[#9C4A3B] text-3xl font-medium mb-2 font-[Bellota]">Dịch vụ</p>
      <h1 className="text-4xl font-medium text-[#7C2E1D] mb-2 font-[Be Vietnam Pro]">FULL PLANNING</h1>
      <div className="w-full border-t border-gray-800 my-8"></div>
      <h2 className="text-2xl text-[#5D5D9C] font-semibold mb-6 font-[Be Vietnam Pro]">
        Lập kế hoạch – Đồng hành chuẩn bị – Điều phối ngày cưới
      </h2>

      <p className="mb-8 text-gray-700" style={{fontFamily: '"Arima Madurai", cursive', fontSize: '18px', lineHeight: '30px'}}>
        Lập kế hoạch cưới tổng thể, đồng hành cùng cặp đôi trong suốt quá trình chuẩn bị và tổ chức
        đám cưới.
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
        <button className="bg-[#8B3E2E] hover:bg-[#6B2F22] text-white px-8 py-5 rounded-xl text-lg font-semibold shadow-md transition-all"
        onClick={() => {navigate('/contact')}}>
          ĐĂNG KÍ TƯ VẤN NGAY
        </button>
      </div>
    </div>
    </div>
  )
}

export default PlanningQuotation
