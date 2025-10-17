import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
const Header = () => {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full h-[300px] bg-[#610912] relative">
      {/* Logo Section */}
      <div className="flex mt-[50px] px-[80px]">
          <img src={logo} alt="logo" className="w-[144px] h-[144px]" />
        </div>
      {/* Main Header Bar */}
      <div className="absolute w-full h-[200px] left-0 top-[0px] px-[146px] flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-[400px] mx-[100px]">
          <div className="relative">
            <div className="bg-[#F8FBF2] rounded-[50px] px-6 py-3.5 flex items-center gap-3">
              {/* Search Icon */}
              <svg className="w-[18px] h-[18px] text-[#334024]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for..."
                className="flex-1 bg-transparent text-[#334024] placeholder-[#334024] font-['DM_Sans'] text-base outline-none"
              />
              {/* Right Search Icon */}
              <svg className="w-[18px] h-[18px] text-[#334024]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* User Authentication Links */}
        <div className="flex items-center gap-6">
          {/* Register Link */}
          <Link to="/register" className="flex items-center gap-2 text-[#F8FBF2] hover:text-[#E8C585] transition-colors">
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0.731873C12.9391 0.731873 11.9217 1.18988 11.1716 2.00515C10.4214 2.82041 10 3.92615 10 5.0791C10 6.23206 10.4214 7.33779 11.1716 8.15306C11.9217 8.96832 12.9391 9.42633 14 9.42633C15.0609 9.42633 16.0783 8.96832 16.8284 8.15306C17.5786 7.33779 18 6.23206 18 5.0791C18 3.92615 17.5786 2.82041 16.8284 2.00515C16.0783 1.18988 15.0609 0.731873 14 0.731873ZM14 2.79681C14.2758 2.79681 14.5489 2.85584 14.8036 2.97054C15.0584 3.08523 15.2899 3.25334 15.4849 3.46528C15.6799 3.67721 15.8346 3.9288 15.9401 4.20571C16.0457 4.48261 16.1 4.77939 16.1 5.0791C16.1 5.37882 16.0457 5.6756 15.9401 5.9525C15.8346 6.2294 15.6799 6.481 15.4849 6.69293C15.2899 6.90486 15.0584 7.07297 14.8036 7.18767C14.5489 7.30237 14.2758 7.3614 14 7.3614C13.7242 7.3614 13.4511 7.30237 13.1964 7.18767C12.9416 7.07297 12.7101 6.90486 12.5151 6.69293C12.3201 6.481 12.1654 6.2294 12.0599 5.9525C11.9543 5.6756 11.9 5.37882 11.9 5.0791C11.9 4.4738 12.1212 3.89329 12.5151 3.46528C12.9089 3.03726 13.443 2.79681 14 2.79681ZM3 3.9923V7.25272H0V9.42633H3V12.6868H5V9.42633H8V7.25272H5V3.9923H3ZM14 10.5131C11.33 10.5131 6 11.9586 6 14.8604V18.1208H22V14.8604C22 11.9586 16.67 10.5131 14 10.5131ZM14 12.5781C16.97 12.5781 20.1 14.1648 20.1 14.8604V16.0559H7.9V14.8604C7.9 14.1648 11 12.5781 14 12.5781Z" fill="#F8FBF2" />
            </svg>

            <span className="text-[#F8FBF2] font-semibold text-base">Đăng Ký</span>
          </Link>

          {/* Login Link */}
          <Link to="/login" className="flex items-center gap-2 text-[#F8FBF2] hover:text-[#E8C585] transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.25 0.25H1.75C0.9175 0.25 0.25 0.9175 0.25 1.75V4.75H1.75V1.75H12.25V12.25H1.75V9.25H0.25V12.25C0.25 12.6478 0.408035 13.0294 0.68934 13.3107C0.970644 13.592 1.35218 13.75 1.75 13.75H12.25C12.6478 13.75 13.0294 13.592 13.3107 13.3107C13.592 13.0294 13.75 12.6478 13.75 12.25V1.75C13.75 1.35218 13.592 0.970644 13.3107 0.68934C13.0294 0.408035 12.6478 0.25 12.25 0.25ZM5.56 9.685L6.625 10.75L10.375 7L6.625 3.25L5.56 4.3075L7.5025 6.25H0.25V7.75H7.5025L5.56 9.685Z" fill="#F8FBF2" />
            </svg>

            <span className="font-semibold text-[#F8FBF2]">Đăng Nhập</span>
          </Link>
        </div>
      </div>

      {/* Separator Line */}
      <div className="absolute w-[1114px] h-px bg-[#D1D1D1] left-[268px] top-[135px] mt-[20px]"></div>

      {/* Navigation Menu */}
      <div className="absolute w-full left-0 top-[208px] flex justify-center items-center">
        <div className="flex items-center gap-[60px] justify-center">
          {/* Homepage Button */}
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-[30px] text-2xl transition-colors whitespace-nowrap no-underline ${
              isActive('/') 
                ? 'bg-[#F8FBF2] text-[#610912]' 
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
            style={{
              color: isActive('/') ? '#610912' : '#F8FBF2',
              textDecoration: 'none',
              fontWeight: 'normal'
            }}
          >
            Homepage
          </Link>

          {/* Other Navigation Links */}
          <Link 
            to="/about" 
            className={`text-2xl transition-colors px-4 py-2 rounded-[30px] whitespace-nowrap no-underline ${
              isActive('/about') 
                ? 'bg-[#F8FBF2] text-[#610912]' 
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
            style={{
              color: isActive('/about') ? '#610912' : '#F8FBF2',
              textDecoration: 'none',
              fontWeight: 'normal'
            }}
          >
            About us
          </Link>
          <Link 
            to="/services" 
            className={`text-2xl transition-colors px-4 py-2 rounded-[30px] whitespace-nowrap no-underline ${
              isActive('/services') 
                ? 'bg-[#F8FBF2] text-[#610912]' 
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
            style={{
              color: isActive('/services') ? '#610912' : '#F8FBF2',
              textDecoration: 'none',
              fontWeight: 'normal'
            }}
          >
            Our Services
          </Link>
          <Link 
            to="/quotation" 
            className={`text-2xl transition-colors px-4 py-2 rounded-[30px] whitespace-nowrap no-underline ${
              isActive('/quotation') 
                ? 'bg-[#F8FBF2] text-[#610912]' 
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
            style={{
              color: isActive('/quotation') ? '#610912' : '#F8FBF2',
              textDecoration: 'none',
              fontWeight: 'normal'
            }}
          >
            Quotation
          </Link>
          <Link 
            to="/blog" 
            className={`text-2xl transition-colors px-4 py-2 rounded-[30px] whitespace-nowrap no-underline ${
              isActive('/blog') 
                ? 'bg-[#F8FBF2] text-[#610912]' 
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
            style={{
              color: isActive('/blog') ? '#610912' : '#F8FBF2',
              textDecoration: 'none',
              fontWeight: 'normal'
            }}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className={`text-2xl transition-colors px-4 py-2 rounded-[30px] whitespace-nowrap no-underline ${
              isActive('/contact') 
                ? 'bg-[#F8FBF2] text-[#610912]' 
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
            style={{
              color: isActive('/contact') ? '#610912' : '#F8FBF2',
              textDecoration: 'none',
              fontWeight: 'normal'
            }}
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
