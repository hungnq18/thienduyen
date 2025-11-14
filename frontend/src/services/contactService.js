import api from './api';

export const sendContactForm = async (formData) => {
  try {
    const response = await api.post('/contact/send', formData);
    return response.data;
  } catch (error) {
    // Handle authentication errors
    if (error.response?.status === 401) {
      throw {
        status: 'error',
        message: error.response?.data?.message || 'Vui lòng đăng nhập để gửi form liên hệ',
      };
    }
    
    // Handle validation errors
    if (error.response?.status === 400) {
      throw error.response.data || {
        status: 'error',
        message: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
      };
    }
    
    // Handle other errors
    throw error.response?.data || {
      status: 'error',
      message: 'Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.',
    };
  }
};

