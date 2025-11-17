import axios from 'axios';

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Ensure API_URL ends with /api
const getBaseURL = () => {
  if (!API_URL) {
    return 'http://localhost:5000/api';
  }
  // If URL already includes /api, use as is
  if (API_URL.includes('/api')) {
    return API_URL;
  }
  // Otherwise, append /api
  return API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`;
};

// Create axios instance
const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      window.location.replace(isAdminRoute ? '/admin/login' : '/login');
    }
    return Promise.reject(error);
  }
);

export default api;

