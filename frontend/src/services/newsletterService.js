import api from './api';

export const subscribeNewsletter = async (email) => {
  try {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  } catch (error) {
    // Handle validation errors
    if (error.response?.status === 400) {
      throw error.response.data || {
        status: 'error',
        message: 'Email không hợp lệ hoặc đã được đăng ký.',
      };
    }
    
    // Handle other errors
    throw error.response?.data || {
      status: 'error',
      message: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
    };
  }
};

