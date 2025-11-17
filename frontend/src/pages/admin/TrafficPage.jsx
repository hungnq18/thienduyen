import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import adminService from '../../services/adminService';

const TrafficPage = () => {
  const [range, setRange] = useState(7);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    dailyViews: [],
    topPages: [],
    topReferrers: [],
  });

  const fetchData = async (selectedRange) => {
    try {
      setLoading(true);
      const stats = await adminService.getTraffic(selectedRange);
      setData(stats);
    } catch (error) {
      console.error('Failed to fetch traffic stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
  }, [range]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Analytics</p>
          <h2 className="text-2xl font-semibold text-[#21060A]">Theo dõi lượt truy cập</h2>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:border-[#6B1F2F]"
        >
          <option value={7}>7 ngày</option>
          <option value={14}>14 ngày</option>
          <option value={30}>30 ngày</option>
        </select>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
        <h3 className="text-lg font-semibold text-[#21060A] mb-4">Biểu đồ lượt truy cập</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data.dailyViews}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6B1F2F" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[#21060A] mb-4">Top trang được xem</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Trang</th>
                  <th className="px-4 py-2 font-medium">Lượt</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((item) => (
                  <tr key={item._id} className="border-t last:border-0">
                    <td className="px-4 py-2 text-gray-700">{item._id}</td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[#21060A] mb-4">Top nguồn truy cập</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Nguồn</th>
                  <th className="px-4 py-2 font-medium">Lượt</th>
                </tr>
              </thead>
              <tbody>
                {data.topReferrers.map((item) => (
                  <tr key={item._id} className="border-t last:border-0">
                    <td className="px-4 py-2 text-gray-700">{item._id}</td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loading && <div className="text-sm text-gray-500">Đang tải dữ liệu...</div>}
    </div>
  );
};

export default TrafficPage;


