import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(formValues);
      const user = response?.data?.user || response?.data?.data?.user;

      if (!user) {
        setError('Không thể xác thực tài khoản. Vui lòng thử lại.');
        return;
      }

      if (user.role !== 'admin') {
        setError('Tài khoản của bạn không có quyền truy cập trang quản trị.');
        return;
      }

      login(user);
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Đăng nhập thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF4F0] to-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Thiện Duyên Admin</p>
          <h1 className="text-2xl font-semibold text-[#21060A]">Đăng nhập</h1>
          <p className="text-sm text-gray-500">Truy cập công cụ quản lý dịch vụ và khách hàng.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus-within:border-[#6B1F2F] focus-within:ring">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="admin@thienduyen.vn"
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
            <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus-within:border-[#6B1F2F] focus-within:ring">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#6B1F2F] text-white font-medium tracking-wide transition hover:bg-[#50101F] disabled:opacity-60"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


