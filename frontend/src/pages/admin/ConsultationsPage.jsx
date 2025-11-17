import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';

const statusOptions = [
  { value: 'new', label: 'Mới' },
  { value: 'in-progress', label: 'Đang xử lý' },
  { value: 'completed', label: 'Hoàn tất' },
  { value: 'archived', label: 'Lưu trữ' },
];

const statusColors = {
  new: 'bg-red-100 text-red-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-gray-100 text-gray-500',
};

const ConsultationsPage = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminService.getConsultations({ page, limit: pagination.limit });
      setData(res.consultations);
      setPagination(res.pagination);
    } catch (error) {
      console.error('Failed to fetch consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await adminService.updateConsultation(id, { status });
    fetchData(pagination.page);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Leads</p>
        <h2 className="text-2xl font-semibold text-[#21060A]">Đăng ký tư vấn</h2>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Khách hàng</th>
                <th className="px-5 py-3 font-medium">Nguồn</th>
                <th className="px-5 py-3 font-medium">Điện thoại</th>
                <th className="px-5 py-3 font-medium">Trạng thái</th>
                <th className="px-5 py-3 font-medium">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id || item.id} className="border-t last:border-0">
                  <td className="px-5 py-3">
                    <div className="font-medium text-[#21060A]">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.email}</div>
                  </td>
                  <td className="px-5 py-3 capitalize text-gray-700">{item.source}</td>
                  <td className="px-5 py-3 text-gray-700">{item.phone || '-'}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status] || 'bg-gray-100 text-gray-500'}`}>
                        {item.status}
                      </span>
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item._id || item.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:border-[#6B1F2F]"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(item.createdAt).toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t text-sm text-gray-500">
          <span>
            Trang {pagination.page}/{pagination.pages || 1}
          </span>
          <div className="space-x-2">
            <button
              disabled={pagination.page === 1 || loading}
              onClick={() => fetchData(pagination.page - 1)}
              className="px-3 py-1 border rounded-lg disabled:opacity-40"
            >
              Trước
            </button>
            <button
              disabled={pagination.page === pagination.pages || loading}
              onClick={() => fetchData(pagination.page + 1)}
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

export default ConsultationsPage;


