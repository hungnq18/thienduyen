import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminService.getUsers({ page, limit: pagination.limit });
      setData(res.users);
      setPagination(res.pagination);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Users</p>
        <h2 className="text-2xl font-semibold text-[#21060A]">Danh sách người dùng</h2>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Họ tên</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Vai trò</th>
                <th className="px-5 py-3 font-medium">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id} className="border-t last:border-0">
                  <td className="px-5 py-3 text-gray-900 font-medium">{user.fullName || 'Chưa cập nhật'}</td>
                  <td className="px-5 py-3 text-gray-600">{user.email}</td>
                  <td className="px-5 py-3 capitalize">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF4F0] text-[#6B1F2F]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(user.createdAt).toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <div className="p-4 text-center text-sm text-gray-500">Đang tải...</div>}
        <div className="flex items-center justify-between px-5 py-3 border-t text-sm text-gray-500">
          <span>
            Trang {pagination.page}/{pagination.pages || 1}
          </span>
          <div className="space-x-2">
            <button
              disabled={pagination.page === 1 || loading}
              onClick={() => fetchUsers(pagination.page - 1)}
              className="px-3 py-1 border rounded-lg disabled:opacity-40"
            >
              Trước
            </button>
            <button
              disabled={pagination.page === pagination.pages || loading}
              onClick={() => fetchUsers(pagination.page + 1)}
              className="px-3 py-1 border rounded-lg disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;


