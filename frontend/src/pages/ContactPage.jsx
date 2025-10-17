import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <h1>Liên hệ với chúng tôi</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Thông tin liên hệ</h2>
            <div className="contact-item">
              <h3>Địa chỉ</h3>
              <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
            </div>
            <div className="contact-item">
              <h3>Điện thoại</h3>
              <p>0123 456 789</p>
            </div>
            <div className="contact-item">
              <h3>Email</h3>
              <p>info@thienduyen.com</p>
            </div>
          </div>
          <div className="contact-form">
            <h2>Gửi tin nhắn</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Họ tên</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Tin nhắn</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Gửi tin nhắn</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
