import api from './api';

export const createConsultation = async (payload) => {
  const response = await api.post('/consultations', payload);
  return response.data.data;
};

export const getMyConsultations = async (params = {}) => {
  const response = await api.get('/consultations/mine', { params });
  return response.data.data;
};

export const getAdminConsultations = async (params = {}) => {
  const response = await api.get('/admin/consultations', { params });
  return response.data.data;
};


