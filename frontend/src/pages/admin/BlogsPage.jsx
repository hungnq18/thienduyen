import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';

const emptyBlog = {
  title: '',
  excerpt: '',
  content: '',
  tags: '',
  status: 'draft',
};

const statusClasses = {
  draft: 'bg-gray-100 text-gray-600',
  published: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-red-100 text-red-700',
};

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(emptyBlog);
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      tags: formValues.tags
        ? formValues.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [],
    };
    if (editingId) {
      await adminService.updateBlog(editingId, payload);
    } else {
      await adminService.createBlog(payload);
    }
    setFormValues(emptyBlog);
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id || blog._id);
    setFormValues({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      status: blog.status || 'draft',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormValues(emptyBlog);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#CC8C81] font-semibold">Blog</p>
        <h2 className="text-2xl font-semibold text-[#21060A]">Quản lý bài viết</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <label className="text-sm font-medium text-gray-700">Tiêu đề *</label>
          <input
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F] focus:ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Tóm tắt *</label>
          <textarea
            name="excerpt"
            value={formValues.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Nội dung *</label>
          <textarea
            name="content"
            value={formValues.content}
            onChange={handleChange}
            required
            rows={6}
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tags (phân cách bởi dấu phẩy)</label>
            <input
              name="tags"
              value={formValues.tags}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 focus:border-[#6B1F2F]"
              placeholder="lễ hằng thuận, concept..."
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
              <option value="published">Xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#6B1F2F] text-white font-medium hover:bg-[#50101F]"
          >
            {editingId ? 'Cập nhật bài viết' : 'Thêm bài viết'}
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
                <th className="px-5 py-3 font-medium">Tiêu đề</th>
                <th className="px-5 py-3 font-medium">Tác giả</th>
                <th className="px-5 py-3 font-medium">Trạng thái</th>
                <th className="px-5 py-3 font-medium">Ngày tạo</th>
                <th className="px-5 py-3 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id || blog._id} className="border-t last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[#21060A]">{blog.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{blog.excerpt}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{blog.author || 'Thiện Duyên'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[blog.status] || 'bg-gray-100 text-gray-500'}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-sm text-[#6B1F2F] hover:underline font-medium"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Xóa bài viết này?')) {
                          await adminService.deleteBlog(blog.id || blog._id);
                          fetchBlogs();
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

export default BlogsPage;


