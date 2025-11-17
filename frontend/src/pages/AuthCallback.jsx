import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import useToast from '../hooks/useToast';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessedRef.current) return;
    
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const error = searchParams.get('error');

    // If no params yet, wait for them
    if (!token && !userParam && !error) {
      return;
    }

    // Mark as processed immediately
    hasProcessedRef.current = true;

    if (error) {
      showToast('Đăng nhập thất bại. Vui lòng thử lại.', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Save token to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update auth context
        login(user);
        
        showToast(`Chào mừng ${user.fullName}! Đăng nhập thành công.`, 'success');
        
        // Check if there's a redirect path
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        
        setTimeout(() => {
          if (redirectPath) {
            sessionStorage.removeItem('redirectAfterLogin');
            navigate(redirectPath);
          } else {
            navigate('/');
          }
        }, 1500);
      } catch (error) {
        console.error('Error parsing user data:', error);
        showToast('Có lỗi xảy ra khi xử lý đăng nhập. Vui lòng thử lại.', 'error');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } else {
      showToast('Thông tin đăng nhập không hợp lệ. Vui lòng thử lại.', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [searchParams, navigate, login, showToast]); // Include dependencies but use ref to prevent loops

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#610912] mb-4"></div>
          <p className="text-gray-700 text-lg">Đang xử lý đăng nhập...</p>
        </div>
      </div>
    </>
  );
}

