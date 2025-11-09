
export default function HeaderQuotationSection() {
  const services = [
    {
      id: 1,
      title: "FULL PLANNING",
      description: "LẬP KẾ HOẠCH - ĐỒNG HÀNH - ĐIỀU PHỐI",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1760848602/Rectangle_4531_g5au5e.png",
    },
    {
      id: 2,
      title: "DECOR",
      description: "LÊN Ý TƯỞNG CONCEPT - TRANG TRÍ",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1760848827/Rectangle_4532_dfr3so.png",
    },
    {
      id: 3,
      title: "ĐIỀU PHỐI",
      description: "ĐIỀU PHỐI NGÀY CƯỚI",
      image: "https://res.cloudinary.com/dijayprrw/image/upload/v1760848897/Rectangle_4533_lvxhrt.png",
    },
  ]

  const scrollToServices = () => {
    const element = document.getElementById("services-section")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const handleServiceClick = (serviceTitle) => {
    const sectionMap = {
      'FULL PLANNING': 'planning-section',
      'DECOR': 'decor-section',
      'ĐIỀU PHỐI': 'coordinator-section',
    };

    const sectionId = sectionMap[serviceTitle];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  const scrollToFirstSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const firstSection = document.getElementById('planning-section');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to next section
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="border-t-4 border-red-900  px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-2xl tracking-tight font-[600] text-gray-900 sm:text-4xl md:text-5xl font-[Be-Vietnam pro]">
            BÁO GIÁ DỊCH VỤ CỦA THIỆN DUYÊN WEDDING
          </h1>
          <p className="mt-6 text-center text-lg text-gray-600">
            Bao gồm 3 gói dịch vụ chính: Decor, Full Planning & Điều Phối
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div id="services-section" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden p-2 rounder-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <h3 className="text-center text-xl font-bold text-gray-900">{service.title}</h3>

                  {/* Red Button with Description */}
                  <button 
                    onClick={() => handleServiceClick(service.title)}
                    className="mt-6 w-full bg-red-900 px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-800"
                  >
                    {service.description}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="flex justify-center pb-16">
        <button
          onClick={scrollToFirstSection}
          className="flex h-16 w-16 items-center justify-center rounded-full  hover:bg-red-100 focus:outline-none cursor-pointer"
          aria-label="Scroll down"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToFirstSection(e);
            }
          }}
        >
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none">
<path d="M45 87.1875C21.7012 87.1875 2.8125 68.2988 2.8125 45C2.8125 21.7012 21.7012 2.8125 45 2.8125C68.2988 2.8125 87.1875 21.7012 87.1875 45C87.1875 68.2988 68.2988 87.1875 45 87.1875ZM52.2323 47.3836V21.0938H37.7677V47.3836H22.5L45 68.9062L67.5 47.3836H52.2323Z" fill="#700304"/>
</svg>

        </button>
      </div>
    </div>
  )
}
