import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      const storedUser = authService.getUser();
      const token = authService.getToken();
      
      if (storedUser && token) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear user state
    setUser(null);
    
    // Redirect to login - use window.location for clean reload
    // This works better in production than react-router navigate
    setTimeout(() => {
      window.location.replace('/login');
    }, 100);
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  }), [user, login, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;

