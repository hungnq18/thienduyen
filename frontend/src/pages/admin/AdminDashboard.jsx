import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import adminService from '../../services/adminService';

const StatCard = ({ title, value, subtitle }) => (
  <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#FFF7F3] p-5 shadow-sm">
    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{title}</p>
    <p className="text-2xl font-semibold text-[#21060A] mt-1">{value}</p>
    {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
  </div>
);

const SimpleTable = ({ title, columns, data, rowKey }) => (
  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-[#21060A]">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            {columns.map((col) => (
              <th key={col.key} className="py-2 pr-4 font-medium">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item[rowKey]} className="border-b last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="py-2 pr-4 text-gray-800">
                  {col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats) {
    return <div className="text-sm text-gray-500">Đang tải dữ liệu...</div>;
  }

  const { totals, charts, recentConsultations, recentContacts } = stats;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Tổng quan</p>
        <h2 className="text-2xl font-semibold text-[#21060A]">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Tổng người dùng" value={totals.totalUsers} />
        <StatCard title="Người dùng mới hôm nay" value={totals.newUsersToday} />
        <StatCard title="Liên hệ mới" value={totals.pendingContacts} subtitle={`Tổng ${totals.totalContacts}`} />
        <StatCard title="Đăng ký tư vấn" value={totals.totalConsultations} subtitle={`${totals.pendingConsultations} yêu cầu chờ`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[#21060A] mb-4">Đăng ký tư vấn (7 ngày)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={charts.consultations}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6B1F2F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[#21060A] mb-4">Lượt truy cập (7 ngày)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={charts.visitors}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4A9D7E" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleTable
          title="Yêu cầu tư vấn mới"
          rowKey="id"
          columns={[
            { key: 'name', title: 'Khách hàng', dataIndex: 'name' },
            { key: 'email', title: 'Email', dataIndex: 'email' },
            { key: 'source', title: 'Nguồn', dataIndex: 'source' },
            { key: 'status', title: 'Trạng thái', dataIndex: 'status' },
          ]}
          data={recentConsultations}
        />
        <SimpleTable
          title="Get-in-touch mới"
          rowKey="_id"
          columns={[
            { key: 'name', title: 'Khách hàng', dataIndex: 'name' },
            { key: 'email', title: 'Email', dataIndex: 'email' },
            { key: 'status', title: 'Trạng thái', dataIndex: 'status' },
          ]}
          data={recentContacts}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;


