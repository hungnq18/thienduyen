import React from 'react';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <div className="container">
        <h1>Dịch vụ của chúng tôi</h1>
        <div className="services-grid">
          <div className="service-card">
            <h3>Phát triển Web</h3>
            <p>Thiết kế và phát triển website chuyên nghiệp</p>
          </div>
          <div className="service-card">
            <h3>Ứng dụng Mobile</h3>
            <p>Phát triển ứng dụng di động cho iOS và Android</p>
          </div>
          <div className="service-card">
            <h3>Tư vấn IT</h3>
            <p>Đưa ra giải pháp công nghệ phù hợp</p>
          </div>
          <div className="service-card">
            <h3>Bảo trì hệ thống</h3>
            <p>Hỗ trợ và bảo trì hệ thống công nghệ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
