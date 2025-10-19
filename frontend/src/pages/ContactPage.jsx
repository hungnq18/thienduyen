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
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xs border border-white/80 p-20 w-full max-w-2xl text-center min-h-screen flex flex-col justify-center">
          <h2 className="text-6xl text-gray-900"
            style={{ fontFamily: 'Belanosima, sans-serif', letterSpacing: '1px' }}>
            GET IN TOUCH
          </h2>
          {/*Form content*/}
          <div className="px-20 w-full max-w-xl text-center min-h-screen flex flex-col justify-center">
            <form className="flex flex-col gap-20 text-left">
              <input
                type="text"
                placeholder="Tên của bạn"
                className="bg-transparent border-b border-gray-700 focus:outline-none text-xl placeholder-gray-700 text-center"
                style={{ fontFamily: 'Arima Madurai, sans-serif' }}
              />

              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b border-gray-700 focus:outline-none text-xl placeholder-gray-700 text-center"
                style={{ fontFamily: 'Arima Madurai, sans-serif' }}
              />

              <input
                type="text"
                placeholder="Số điện thoại"
                className="bg-transparent border-b border-gray-700 focus:outline-none text-xl placeholder-gray-700 text-center"
                style={{ fontFamily: 'Arima Madurai, sans-serif' }}
              />

              <textarea
                rows="3"
                placeholder="Các thông tin chung về đám cưới của bạn: ngày tổ chức dự kiến, địa điểm tổ chức, ngân sách,…"
                className="bg-transparent border-b border-gray-700 focus:outline-none text-xl placeholder-gray-700 resize-none text-justify"
                style={{ fontFamily: 'Arima Madurai, sans-serif', overflowY: 'hidden' }}
              ></textarea>

              <button
                className="mx-auto transition-colors duration-300 uppercase border-2 text-[23px] leading-[29px]"
                style={{
                  backgroundColor: "#610912",
                  color: "#FFFFFF",
                  borderColor: "#610912",
                  borderRadius: "0",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 800,
                  width: "218px",
                  height: "60px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                <span
                  className="text-[23px] leading-[29px]"
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  Gửi
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
