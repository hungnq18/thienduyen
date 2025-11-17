import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; // logo của bạn
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();

  // Keyword mapping to routes
  const keywordMap = {
    // Trang chủ
    'trang chủ': '/',
    'homepage': '/',
    'home': '/',
    'thiện duyên': '/',
    
    // Giới thiệu
    'about': '/about',
    'giới thiệu': '/about',
    'về thiện duyên': '/about',
    'đội ngũ': '/about',
    'founder': '/about',
    'team': '/about',
    
    // Dịch vụ chính
    'dịch vụ': '/services',
    'service': '/services',
    'lễ hằng thuận': '/services',
    'lễ cưới phật giáo': '/services',
    'spiritual wedding': '/services',
    'wedding ceremony': '/services',
    'nghi lễ cưới': '/services',
    'resort wedding': '/services',
    'lễ tại chùa': '/services',
    'tổ chức lễ': '/services',
    
    // Gói lễ / Báo giá
    'báo giá': '/quotation',
    'giá': '/quotation',
    'gói': '/quotation',
    'quotation': '/quotation',
    'package': '/quotation',
    'cost': '/quotation',
    'chi phí': '/quotation',
    'giá lễ hằng thuận': '/quotation',
    'basic': '/quotation',
    'delux': '/quotation',
    'premium': '/quotation',
    'chùa': '/quotation',
    'chùa hà nội': '/quotation',
    'thiền': '/quotation',
    'resort': '/quotation',
    'phong cách': '/quotation',
    'minimal': '/quotation',
    'truyền thống': '/quotation',
    'phật giáo': '/quotation',
    'bao nhiêu': '/quotation',
    
    // Blog / Kiến thức
    'blog': '/blog',
    'tin tức': '/blog',
    'bài viết': '/blog',
    'chuyện cưới': '/blog',
    'câu chuyện': '/blog',
    'kiến thức': '/blog',
    'ý nghĩa lễ hằng thuận': '/blog',
    'wedding stories': '/blog',
    
    // Liên hệ / Đăng ký
    'liên hệ': '/contact',
    'contact': '/contact',
    'đăng ký': '/register',
    'đăng nhập': '/login',
    'tư vấn': '/contact',
    'get in touch': '/contact',
    'đặt lịch': '/contact',
    'đặt lễ': '/contact',
    'hỗ trợ': '/contact',
    'kết nối': '/contact',
    
    // FAQ (nếu có route)
    'faq': '/',
    'hỏi đáp': '/',
    'thắc mắc': '/',
    'hướng dẫn': '/',
    'chuẩn bị lễ': '/',
    'quy trình': '/',
    'tư vấn cưới': '/',
    'là gì': '/',
    
    // Workshop / Sự kiện (nếu có route)
    'workshop': '/',
    'khóa học': '/',
    'sự kiện': '/',
    'chia sẻ': '/',
    'nghi lễ thử': '/',
    'wedding experience': '/',
    
    // Dự án / Chiến dịch (nếu có route)
    'gieo duyên': '/',
    'dự án gieo duyên': '/',
    'couple with purpose': '/',
    'mini documentary': '/',
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.toLowerCase().trim();
    
    // Check exact match first
    if (keywordMap[query]) {
      navigate(keywordMap[query]);
      setSearchQuery('');
      setMenuOpen(false); // Close mobile menu
      return;
    }
    
    // Check partial match
    for (const [keyword, route] of Object.entries(keywordMap)) {
      if (query.includes(keyword) || keyword.includes(query)) {
        navigate(route);
        setSearchQuery('');
        setMenuOpen(false); // Close mobile menu
        return;
      }
    }
    
    // If no match found, stay on current page or show message
    // You can add a toast notification here if needed
    setSearchQuery('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-[#610912] relative flex flex-col items-center pb-4">
      {/* Horizontal Line Below Search */}
      <div 
        className="hidden lg:block absolute"
        style={{
          width: '1114px',
          height: '0px',
          left: '268px',
          top: '135px',
          borderTop: '1px solid #D1D1D1'
        }}
      />
      
      <div className="w-full flex justify-between items-center px-6 lg:px-16 py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="cursor-pointer">
          <img src={logo} alt="logo" className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex w-full max-w-[300px] lg:max-w-[300px] ml-4 lg:ml-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className="bg-[#F8FBF2] rounded-full px-4 py-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#334024]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-[#334024] placeholder-[#334024] font-['DM_Sans'] text-base outline-none"
              />
            </div>
          </form>
        </div>

        {/* Auth links */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-[#F8FBF2]">
                <User size={20} />
                <span className="font-semibold">{user?.fullName || user?.email}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-[#F8FBF2] hover:text-[#E8C585] transition-colors font-semibold"
              >
                <LogOut size={20} />
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  // Trigger modal via custom event or state management
                  window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'register' } }));
                }}
                className="text-[#F8FBF2] hover:text-[#E8C585] transition-colors font-semibold"
              >
                Đăng Ký
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'login' } }));
                }}
                className="text-[#F8FBF2] hover:text-[#E8C585] transition-colors font-semibold"
              >
                Đăng Nhập
              </button>
            </>
          )}
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
          {/* Mobile Search Bar */}
          <div className="w-full max-w-[280px] px-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="bg-[#F8FBF2] rounded-full px-4 py-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#334024]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-[#334024] placeholder-[#334024] font-['DM_Sans'] text-sm outline-none"
                />
              </div>
            </form>
          </div>
          
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
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-[#F8FBF2]">
                  <User size={20} />
                  <span>{user?.fullName || user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-[#F8FBF2] hover:text-[#E8C585]"
                >
                  <LogOut size={20} />
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'register' } }));
                  }}
                  className="text-[#F8FBF2] hover:text-[#E8C585]"
                >
                  Đăng Ký
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'login' } }));
                  }}
                  className="text-[#F8FBF2] hover:text-[#E8C585]"
                >
                  Đăng Nhập
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
