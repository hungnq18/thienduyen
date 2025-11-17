import { LayoutDashboard, LineChart, LogOut, MessageSquare, Notebook, Settings, UserRound, Users } from 'lucide-react';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = useMemo(
    () => [
      { key: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { key: '/admin/consultations', icon: MessageSquare, label: 'Đăng ký tư vấn' },
      { key: '/admin/services', icon: Settings, label: 'Dịch vụ' },
      { key: '/admin/blogs', icon: Notebook, label: 'Blog' },
      { key: '/admin/users', icon: Users, label: 'Người dùng' },
      { key: '/admin/traffic', icon: LineChart, label: 'Lượt truy cập' },
    ],
    []
  );

  const handleNavigate = (key) => {
    navigate(key);
  };

  return (
    <div className="min-h-screen flex bg-[#f7f7f5]">
      <aside className="w-64 bg-[#21060A] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-lg font-semibold tracking-wide">Thiện Duyên Admin</p>
          <p className="text-sm text-white/70">{user?.email}</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map(({ key, icon: Icon, label }) => {
            const isActive = location.pathname === key;
            return (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="m-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Phiên bản quản trị</p>
            <p className="font-semibold text-gray-900">Xin chào, {user?.fullName || 'Admin'}</p>
          </div>
          <UserRound className="text-[#6B1F2F]" />
        </header>
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


