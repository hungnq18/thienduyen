import api from './api';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.status === 'success') {
        // Store token and user data
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.status === 'success') {
        // Store token and user data
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get stored user data
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || 'An error occurred';
      const errors = error.response.data.errors || [];
      return { message, errors, status: error.response.status };
    } else if (error.request) {
      // Request made but no response
      return { 
        message: 'Cannot connect to server. Please check your connection.', 
        errors: [] 
      };
    } else {
      // Something else happened
      return { 
        message: error.message || 'An unexpected error occurred', 
        errors: [] 
      };
    }
  }
}

export default new AuthService();

