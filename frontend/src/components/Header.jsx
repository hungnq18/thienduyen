import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg'; // logo của bạn

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-[#610912] relative flex flex-col items-center pb-4">
      <div className="w-full flex justify-between items-center px-6 lg:px-16 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-[400px] mx-6">
          <div className="relative w-full">
            <div className="bg-[#F8FBF2] rounded-full px-4 py-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#334024]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for..."
                className="flex-1 bg-transparent text-[#334024] placeholder-[#334024] font-['DM_Sans'] text-base outline-none"
              />
            </div>
          </div>
        </div>

        {/* Auth links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/register" className="text-[#F8FBF2] hover:text-[#E8C585] transition-colors font-semibold">
            Đăng Ký
          </Link>
          <Link to="/login" className="text-[#F8FBF2] hover:text-[#E8C585] transition-colors font-semibold">
            Đăng Nhập
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-[#F8FBF2] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Nav (Desktop) */}
      <nav className="hidden md:flex justify-center items-center gap-10 mt-4">
        {[
          { to: '/', label: 'Homepage' },
          { to: '/about', label: 'About us' },
          { to: '/services', label: 'Our Services' },
          { to: '/quotation', label: 'Quotation' },
          { to: '/blog', label: 'Blog' },
          { to: '/contact', label: 'Get In Touch' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-xl px-4 py-2 rounded-full transition-colors ${
              isActive(to)
                ? 'bg-[#F8FBF2] text-[#610912]'
                : 'text-[#F8FBF2] hover:text-[#E8C585] hover:bg-white/10'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-[#610912] z-50 flex flex-col items-center gap-6 py-6 border-t border-white/20 transition-all duration-300 md:hidden">
          {[
            { to: '/', label: 'Homepage' },
            { to: '/about', label: 'About us' },
            { to: '/services', label: 'Our Services' },
            { to: '/quotation', label: 'Quotation' },
            { to: '/blog', label: 'Blog' },
            { to: '/contact', label: 'Get In Touch' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`text-lg transition-colors ${
                isActive(to)
                  ? 'text-[#E8C585]'
                  : 'text-[#F8FBF2] hover:text-[#E8C585]'
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="flex flex-col items-center gap-4 mt-4">
            <Link to="/register" className="text-[#F8FBF2] hover:text-[#E8C585]">Đăng Ký</Link>
            <Link to="/login" className="text-[#F8FBF2] hover:text-[#E8C585]">Đăng Nhập</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
