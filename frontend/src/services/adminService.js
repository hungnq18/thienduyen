import api from './api';

class AdminService {
  async getDashboardStats() {
    const response = await api.get('/admin/stats');
    return response.data.data;
  }

  async getTraffic(range = 7) {
    const response = await api.get(`/admin/traffic?range=${range}`);
    return response.data.data;
  }

  async getConsultations(params = {}) {
    const response = await api.get('/admin/consultations', { params });
    return response.data.data;
  }

  async updateConsultation(id, payload) {
    const response = await api.patch(`/admin/consultations/${id}`, payload);
    return response.data.data;
  }

  async getServices() {
    const response = await api.get('/admin/services');
    return response.data.data;
  }

  async createService(payload) {
    const response = await api.post('/admin/services', payload);
    return response.data.data;
  }

  async updateService(id, payload) {
    const response = await api.patch(`/admin/services/${id}`, payload);
    return response.data.data;
  }

  async deleteService(id) {
    return api.delete(`/admin/services/${id}`);
  }

  async getBlogs() {
    const response = await api.get('/admin/blogs');
    return response.data.data;
  }

  async createBlog(payload) {
    const response = await api.post('/admin/blogs', payload);
    return response.data.data;
  }

  async updateBlog(id, payload) {
    const response = await api.patch(`/admin/blogs/${id}`, payload);
    return response.data.data;
  }

  async deleteBlog(id) {
    return api.delete(`/admin/blogs/${id}`);
  }

  async getUsers(params = {}) {
    const response = await api.get('/admin/users', { params });
    return response.data.data;
  }

  async getContactById(id) {
    const response = await api.get(`/contact/${id}`);
    return response.data.data;
  }

  async updateContactStatus(id, payload) {
    const response = await api.patch(`/contact/${id}/status`, payload);
    return response.data.data;
  }

  async replyToContact(id, payload) {
    const response = await api.post(`/contact/${id}/reply`, payload);
    return response.data.data;
  }
}

export default new AdminService();


