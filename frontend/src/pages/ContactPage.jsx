import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import useToast from '../hooks/useToast';
import { createConsultation } from '../services/consultationService';
import { sendContactForm } from '../services/contactService';

function ContactPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const hasAutoFilledRef = useRef(false);

  // Memoize user properties to avoid unnecessary re-renders
  const userFullName = useMemo(() => user?.fullName || '', [user?.fullName]);
  const userEmail = useMemo(() => user?.email || '', [user?.email]);

  // Load form data from sessionStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem('contactFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading form data from session:', error);
      }
    }
  }, []);

  // Auto-fill user info if logged in (only once)
  useEffect(() => {
    if (!loading && isAuthenticated && user && !hasAutoFilledRef.current) {
      setFormData((prev) => {
        // Only update if the values are actually different
        if (prev.name === (userFullName || '') && prev.email === (userEmail || '')) {
          return prev;
        }
        const updated = {
          ...prev,
          name: userFullName || prev.name,
          email: userEmail || prev.email,
        };
        // Save to sessionStorage
        sessionStorage.setItem('contactFormData', JSON.stringify(updated));
        hasAutoFilledRef.current = true;
        return updated;
      });
    }
  }, [isAuthenticated, userFullName, userEmail, loading]);

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    if (formData.name || formData.email || formData.phone || formData.message) {
      sessionStorage.setItem('contactFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    
    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    
    // Validate on blur
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Tên là bắt buộc';
        } else if (value.trim().length < 2) {
          error = 'Tên phải có ít nhất 2 ký tự';
        } else if (value.trim().length > 100) {
          error = 'Tên không được vượt quá 100 ký tự';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email là bắt buộc';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Email không hợp lệ';
          }
        }
        break;
      case 'phone':
        if (value && !/^[0-9+\-\s()]+$/.test(value)) {
          error = 'Số điện thoại không hợp lệ';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Tin nhắn là bắt buộc';
        } else if (value.trim().length < 10) {
          error = 'Tin nhắn phải có ít nhất 10 ký tự';
        } else if (value.trim().length > 2000) {
          error = 'Tin nhắn không được vượt quá 2000 ký tự';
        }
        break;
      default:
        break;
    }
    
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    
    return !error;
  };

  const validateForm = () => {
    const fields = ['name', 'email', 'message'];
    let isValid = true;
    
    fields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    
    // Validate form
    if (!validateForm()) {
      showToast('Vui lòng kiểm tra lại thông tin đã nhập', 'error');
      return;
    }

    // Check authentication only when submitting
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để gửi form liên hệ', 'error');
      // Save current form data before redirecting
      sessionStorage.setItem('contactFormData', JSON.stringify(formData));
      sessionStorage.setItem('redirectAfterLogin', '/contact');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    try {
      const response = await sendContactForm(formData);
      
      if (response.status === 'success') {
        // Log consultation request for admin dashboard
        try {
          await createConsultation({
            name: formData.name || userFullName || 'Ẩn danh',
            email: formData.email || userEmail,
            phone: formData.phone,
            message: formData.message,
            source: 'get-in-touch',
          });
        } catch (trackError) {
          console.warn('Failed to log consultation request:', trackError?.message);
        }

        setSubmitSuccess(true);
        showToast(
          response.message || 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
          'success',
          5000
        );
        
        // Clear sessionStorage after successful submit
        sessionStorage.removeItem('contactFormData');
        sessionStorage.removeItem('redirectAfterLogin');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setErrors({});
        setTouched({});
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        showToast(response.message || 'Có lỗi xảy ra. Vui lòng thử lại.', 'error');
      }
    } catch (error) {
      // Handle authentication errors
      if (error.status === 'error' && (error.message?.includes('authorized') || error.message?.includes('đăng nhập'))) {
        showToast('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
        // Save current form data before redirecting
        sessionStorage.setItem('contactFormData', JSON.stringify(formData));
        sessionStorage.setItem('redirectAfterLogin', '/contact');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showToast(
          error.message || 'Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.',
          'error'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state only while checking auth (brief moment)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
        <div className="text-center">
          <div className="text-xl text-gray-700">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dijayprrw/image/upload/v1760838904/Rectangle_4565_xcjjii.png')",
        backgroundColor: "#FDF6EE",
      }}
    >
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}

      {/* Form mờ nền chiếm toàn chiều cao */}
      <div className="w-full flex items-center justify-center px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-sm border border-white/80 p-8 sm:p-12 md:p-20 w-full max-w-2xl min-h-[80vh] flex flex-col justify-center rounded-md">
          {/* Title */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-gray-900 text-center mb-8"
            style={{ fontFamily: 'Belanosima, sans-serif', letterSpacing: '1px' }}
          >
            GET IN TOUCH
          </h2>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800 font-semibold text-lg">
                ✓ Form đã được gửi thành công!
              </p>
              <p className="text-green-700 text-sm mt-1">
                Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi sớm nhất có thể.
              </p>
            </div>
          )}

          {/* Login Notice (if not authenticated) */}
          {!isAuthenticated && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-yellow-800 text-sm">
                ⚠️ Vui lòng <button onClick={() => navigate('/login')} className="underline font-semibold">đăng nhập</button> để gửi form liên hệ
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 text-left">
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tên của bạn *"
                required
                className={`bg-transparent border-b ${
                  touched.name && errors.name
                    ? 'border-red-500'
                    : touched.name && !errors.name
                    ? 'border-green-500'
                    : 'border-gray-700'
                } focus:outline-none text-base sm:text-xl placeholder-gray-700 text-center py-2 sm:py-3 w-full transition-colors`}
                style={{ fontFamily: 'Arima Madurai, sans-serif' }}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1 text-center">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email *"
                required
                className={`bg-transparent border-b ${
                  touched.email && errors.email
                    ? 'border-red-500'
                    : touched.email && !errors.email
                    ? 'border-green-500'
                    : 'border-gray-700'
                } focus:outline-none text-base sm:text-xl placeholder-gray-700 text-center py-2 sm:py-3 w-full transition-colors`}
                style={{ fontFamily: 'Arima Madurai, sans-serif' }}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1 text-center">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Số điện thoại (tùy chọn)"
                className={`bg-transparent border-b ${
                  touched.phone && errors.phone
                    ? 'border-red-500'
                    : touched.phone && !errors.phone
                    ? 'border-green-500'
                    : 'border-gray-700'
                } focus:outline-none text-base sm:text-xl placeholder-gray-700 text-center py-2 sm:py-3 w-full transition-colors`}
                style={{ fontFamily: 'Arima Madurai, sans-serif' }}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1 text-center">{errors.phone}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="3"
                placeholder="Các thông tin chung về đám cưới của bạn: ngày tổ chức dự kiến, địa điểm tổ chức, ngân sách,… *"
                required
                className={`bg-transparent border-b ${
                  touched.message && errors.message
                    ? 'border-red-500'
                    : touched.message && !errors.message
                    ? 'border-green-500'
                    : 'border-gray-700'
                } focus:outline-none text-base sm:text-xl placeholder-gray-700 resize-none text-justify py-2 sm:py-3 w-full transition-colors`}
                style={{ fontFamily: 'Arima Madurai, sans-serif', overflowY: 'hidden' }}
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                {touched.message && errors.message ? (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                ) : (
                  <p className="text-gray-500 text-xs">
                    Tối thiểu 10 ký tự, tối đa 2000 ký tự
                  </p>
                )}
                <p
                  className={`text-xs ${
                    formData.message.length > 2000
                      ? 'text-red-500'
                      : formData.message.length >= 10
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {formData.message.length}/2000
                </p>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-gray-600 text-sm text-center mt-2">
              * Các trường bắt buộc
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className="mx-auto transition-colors duration-300 uppercase border-2 text-base sm:text-[23px] leading-[29px] px-6 sm:px-0 sm:w-[218px] sm:h-[60px] flex items-center justify-center font-extrabold disabled:opacity-50 disabled:cursor-not-allowed relative"
              style={{
                backgroundColor: isSubmitting || submitSuccess ? "#999" : "#610912",
                color: "#FFFFFF",
                borderColor: isSubmitting || submitSuccess ? "#999" : "#610912",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && !submitSuccess) {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#610912";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && !submitSuccess) {
                  e.currentTarget.style.backgroundColor = "#610912";
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang gửi...
                </span>
              ) : submitSuccess ? (
                '✓ Đã gửi'
              ) : (
                'Gửi'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
