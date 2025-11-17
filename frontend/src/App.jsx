import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AuthModal from './components/AuthModal';
import CoordinatorQuotation from './components/CoordinatorQuotation';
import DecorQuotation from './components/DecorQuotation';
import PlanningQuotation from './components/PlanningQuotation';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/mainLayout';
import AboutPage from './pages/AboutPage';
import AuthCallback from './pages/AuthCallback';
import BlogPage from './pages/BlogPage';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import BlogPost3 from './pages/BlogPost3';
import Concept from './pages/Concept';
import ContactPage from './pages/ContactPage';
import DecorQuotationPage from './pages/DecorQuotationPage';
import DecorQuotationResortPage from './pages/DecorQuotationResort';
import HomePage from './pages/HomePage';
import QuotationPage from './pages/QuotationPage';
import ServicesPage from './pages/ServicesPage';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Listen for custom events to open modal
  useEffect(() => {
    const handleOpenModal = (event) => {
      setAuthModalMode(event.detail.mode || 'login');
      setShowAuthModal(true);
    };

    window.addEventListener('openAuthModal', handleOpenModal);
    return () => window.removeEventListener('openAuthModal', handleOpenModal);
  }, []);

  // Show modal when user first visits (if not authenticated)
  useEffect(() => {
    // Only show on homepage and if not authenticated
    if (location.pathname === '/' && !loading && !isAuthenticated) {
      // Check if user has seen the modal before (using sessionStorage)
      const hasSeenModal = sessionStorage.getItem('hasSeenAuthModal');
      if (!hasSeenModal) {
        // Delay to show modal after page loads
        const timer = setTimeout(() => {
          setShowAuthModal(true);
          sessionStorage.setItem('hasSeenAuthModal', 'true');
        }, 1000); // Show after 1 second
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, isAuthenticated, loading]);

  // Handle login/register routes - redirect to modal
  useEffect(() => {
    if (location.pathname === '/login') {
      setAuthModalMode('login');
      setShowAuthModal(true);
    } else if (location.pathname === '/register') {
      setAuthModalMode('register');
      setShowAuthModal(true);
    }
  }, [location.pathname]);

  const handleCloseModal = () => {
    setShowAuthModal(false);
    // Update URL if we're on login/register routes
    if (location.pathname === '/login' || location.pathname === '/register') {
      window.history.replaceState({}, '', '/');
    }
  };

  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/quotation" element={<QuotationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/1" element={<BlogPost1 />} />
          <Route path="/blog/2" element={<BlogPost2 />} />
          <Route path="/blog/3" element={<BlogPost3 />} />
          <Route path="/services/1" element={<PlanningQuotation />} />
          <Route path="/services/2" element={<DecorQuotation />} />
          <Route path="/services/3" element={<CoordinatorQuotation />} />
          <Route path="/decor-quotation" element={<DecorQuotationPage />} />
          <Route path="/decor-quotation-resort" element={<DecorQuotationResortPage />} />
          <Route path="/concept" element={<Concept />} />
          {/* 404 route phải ở cuối cùng */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleCloseModal}
        initialMode={authModalMode}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <MainLayout>
        <AppContent />
      </MainLayout>
    </Router>
  );
}

export default App;
