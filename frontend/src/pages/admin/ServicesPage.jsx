import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';

const statusClasses = {
  draft: 'bg-gray-100 text-gray-600',
  published: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-red-100 text-red-700',
};

const emptyForm = {
  title: '',
  category: '',
  description: '',
  priceRange: '',
  status: 'draft',
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await adminService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await adminService.updateService(editingId, formValues);
    } else {
      await adminService.createService(formValues);
    }
    setFormValues(emptyForm);
    setEditingId(null);
    fetchServices();
  };

  const handleEdit = (service) => {
    setEditingId(service.id || service._id);
    setFormValues({
      title: service.title || '',
      category: service.category || '',
      description: service.description || '',
      priceRange: service.priceRange || '',
      status: service.status || 'draft',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormValues(emptyForm);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Services</p>
        <h2 className="text-2xl font-semibold text-[#21060A]">Quản lý dịch vụ</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 border border-gray-100 rounded-2xl shadow-sm">
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Tên dịch vụ *</label>
          <input
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F] focus:ring"
            placeholder="VD: Lễ Hằng Thuận tại chùa"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Danh mục</label>
          <input
            name="category"
            value={formValues.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
            placeholder="Chùa / Resort..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Khoảng giá</label>
          <input
            name="priceRange"
            value={formValues.priceRange}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
            placeholder="VD: 50 - 100 triệu"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Mô tả *</label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
            placeholder="Mô tả ngắn gọn dịch vụ..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            name="status"
            value={formValues.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
          >
            <option value="draft">Nháp</option>
            <option value="published">Công khai</option>
            <option value="archived">Lưu trữ</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#6B1F2F] text-white font-medium hover:bg-[#50101F]"
          >
            {editingId ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="text-sm text-gray-500 underline">
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </form>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Tên dịch vụ</th>
                <th className="px-5 py-3 font-medium">Danh mục</th>
                <th className="px-5 py-3 font-medium">Khoảng giá</th>
                <th className="px-5 py-3 font-medium">Trạng thái</th>
                <th className="px-5 py-3 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id || service._id} className="border-t last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[#21060A]">{service.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{service.description}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{service.category || '-'}</td>
                  <td className="px-5 py-3 text-gray-600">{service.priceRange || '-'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[service.status] || 'bg-gray-100 text-gray-500'}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-sm text-[#6B1F2F] hover:underline font-medium"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Bạn chắc chắn muốn xóa dịch vụ này?')) {
                          await adminService.deleteService(service.id || service._id);
                          fetchServices();
                        }
                      }}
                      className="text-sm text-red-600 hover:underline font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <div className="p-4 text-center text-sm text-gray-500">Đang tải...</div>}
      </div>
    </div>
  );
};

export default ServicesPage;


