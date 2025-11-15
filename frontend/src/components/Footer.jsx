import { useState } from "react";
import face from "../assets/face.svg";
import logo from "../assets/logo.svg";
import useToast from "../hooks/useToast";
import { subscribeNewsletter } from "../services/newsletterService";
import Toast from "./Toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const validateEmail = (emailValue) => {
    if (!emailValue || !emailValue.trim()) {
      setEmailError("Email là bắt buộc");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue.trim())) {
      setEmailError("Email không hợp lệ");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    setEmailError("");

    try {
      const response = await subscribeNewsletter(email.trim());
      
      if (response.status === "success") {
        showToast(
          response.message || "Đăng ký thành công! Vui lòng kiểm tra email.",
          "success",
          5000
        );
        setEmail("");
      } else {
        showToast(
          response.message || "Có lỗi xảy ra. Vui lòng thử lại.",
          "error"
        );
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        (error.status === "error" ? error.message : "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
      showToast(errorMessage, "error");
      
      if (error.message?.includes("đã được đăng ký")) {
        setEmailError("Email này đã được đăng ký");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
      <footer className="w-full bg-[#610912] text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">

        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="logo" className="w-[120px] h-[120px] mb-4" />
          <p className="text-sm text-[#F8FBF2]/80">
            © {new Date().getFullYear()} Thiên Duyên Wedding
          </p>
        </div>

        {/* Chính sách Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: "Arimo, sans-serif" }}>
            Chính sách
          </h4>
          <ul className="space-y-2 text-lg" style={{ fontFamily: "Arimo, sans-serif", fontWeight: 400 }}>
            <li className="cursor-pointer">Điều khoản sử dụng</li>
            <li className="cursor-pointer">Chính sách bảo mật</li>
            <li className="cursor-pointer">Tính trợ năng</li>
          </ul>
        </div>

        {/* Liên hệ Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: "Arimo, sans-serif" }}>
            Liên hệ
          </h4>
          <div className="space-y-2 text-lg" style={{ fontFamily: "Arimo, sans-serif", fontWeight: 400 }}>
            <p>Trường Đại học FPT</p>
            <p>Điện thoại: 091 338 3603</p>
            <p>Email: Thienduyenceremony@gmail.com</p>
          </div>
        </div>

        {/* Newsletter + Social Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: "Arimo, sans-serif" }}>
            Nhận tin mới
          </h4>
          <form onSubmit={handleSubmit} className="w-full max-w-[420px] mb-4">
            <div className="flex w-full border border-white rounded-xl overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                placeholder="Enter your email"
                className={`flex-1 bg-transparent text-white placeholder-white px-4 py-3 outline-none text-base ${
                  emailError ? "border-red-500" : ""
                }`}
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 400 }}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="bg-white text-[#610912] px-5 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700 }}
              >
                {isSubmitting ? "..." : "Đăng ký"}
              </button>
            </div>
            {emailError && (
              <p className="text-red-300 text-sm mt-1 ml-1">{emailError}</p>
            )}
          </form>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start">
            {/* Facebook */}
            <button
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=61581429876073",
                  "_blank"
                )
              }
              className="w-[42px] h-[42px] hover:scale-110 transition-transform"
            >
              <img src={face} alt="Facebook" className="w-full h-full" />
            </button>

            {/* TikTok */}
            <button className="w-[42px] h-[42px] hover:scale-110 transition-transform">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.9167 5.09711C24.4929 3.68642 23.7081 1.87509 23.7083 0H17.2708V22.4128C17.2222 23.626 16.6323 24.7754 15.6256 25.6184C14.6189 26.4615 13.2742 26.9323 11.875 26.9316C8.91667 26.9316 6.45833 24.8349 6.45833 22.2321C6.45833 19.1232 9.91667 16.7916 13.4792 17.7495V12.0379C6.29167 11.2064 0 16.0505 0 22.2321C0 28.251 5.75 32.5348 11.8542 32.5348C18.3958 32.5348 23.7083 27.9257 23.7083 22.2321V10.863C26.3187 12.4895 29.4528 13.3621 32.6667 13.3573V7.77219C32.6667 7.77219 28.75 7.93487 25.9167 5.09711Z" fill="white" />
              </svg>
            </button>

            {/* Google */}
            <button className="w-[42px] h-[42px] hover:scale-110 transition-transform">
              <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.21667 9.95926C3.95078 6.96522 6.61005 4.44833 9.8975 2.68966C13.185 0.930987 16.9712 -0.000228624 20.8333 4.21025e-08C26.4479 4.21025e-08 31.1646 1.79122 34.7708 4.7085L28.7979 9.89238C26.6375 8.10116 23.8917 7.18838 20.8333 7.18838C15.4063 7.18838 10.8125 10.3696 9.17709 14.6406C8.76042 15.7251 8.52292 16.8819 8.52292 18.0749C8.52292 19.2678 8.76042 20.4246 9.17709 21.5091C10.8146 25.782 15.4063 28.9614 20.8333 28.9614C23.6354 28.9614 26.0208 28.3197 27.8875 27.2352C28.9697 26.6171 29.8961 25.8149 30.6108 24.8773C31.3256 23.9397 31.8137 22.8861 32.0458 21.7802H20.8333V14.7889H40.4542C40.7 15.971 40.8333 17.2037 40.8333 18.4852C40.8333 23.9908 38.5625 28.6252 34.6208 31.7702C31.175 34.532 26.4583 36.1497 20.8333 36.1497C18.0972 36.1507 15.3876 35.6838 12.8595 34.7758C10.3314 33.8678 8.03427 32.5365 6.0995 30.8579C4.16473 29.1793 2.6302 27.1863 1.58361 24.993C0.537029 22.7996 -0.00109346 20.4488 1.66816e-06 18.0749C1.66816e-06 15.1576 0.804168 12.3994 2.21667 9.95926Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
