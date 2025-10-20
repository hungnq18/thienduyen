function ContactPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dijayprrw/image/upload/v1760838904/Rectangle_4565_xcjjii.png')",
        backgroundColor: "#FDF6EE",
      }}
    >
      {/* Form mờ nền chiếm toàn chiều cao */}
      <div className="w-full flex items-center justify-center px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-sm border border-white/80 p-8 sm:p-12 md:p-20 w-full max-w-2xl min-h-[80vh] flex flex-col justify-center rounded-md">
          {/* Title */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-gray-900 text-center mb-8"
            style={{ fontFamily: 'Belanosima, sans-serif', letterSpacing: '1px' }}
          >
            GET IN TOUCH
          </h2>

          {/* Form */}
          <form className="flex flex-col gap-6 sm:gap-8 text-left">
            <input
              type="text"
              placeholder="Tên của bạn"
              className="bg-transparent border-b border-gray-700 focus:outline-none text-base sm:text-xl placeholder-gray-700 text-center py-2 sm:py-3"
              style={{ fontFamily: 'Arima Madurai, sans-serif' }}
            />

            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border-b border-gray-700 focus:outline-none text-base sm:text-xl placeholder-gray-700 text-center py-2 sm:py-3"
              style={{ fontFamily: 'Arima Madurai, sans-serif' }}
            />

            <input
              type="text"
              placeholder="Số điện thoại"
              className="bg-transparent border-b border-gray-700 focus:outline-none text-base sm:text-xl placeholder-gray-700 text-center py-2 sm:py-3"
              style={{ fontFamily: 'Arima Madurai, sans-serif' }}
            />

            <textarea
              rows="3"
              placeholder="Các thông tin chung về đám cưới của bạn: ngày tổ chức dự kiến, địa điểm tổ chức, ngân sách,…"
              className="bg-transparent border-b border-gray-700 focus:outline-none text-base sm:text-xl placeholder-gray-700 resize-none text-justify py-2 sm:py-3"
              style={{ fontFamily: 'Arima Madurai, sans-serif', overflowY: 'hidden' }}
            ></textarea>

            {/* Submit Button */}
            <button
              className="mx-auto transition-colors duration-300 uppercase border-2 text-base sm:text-[23px] leading-[29px] px-6 sm:px-0 sm:w-[218px] sm:h-[60px] flex items-center justify-center font-extrabold"
              style={{
                backgroundColor: "#610912",
                color: "#FFFFFF",
                borderColor: "#610912",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = "#610912";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#610912";
                e.currentTarget.style.color = "#FFFFFF";
              }}
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
