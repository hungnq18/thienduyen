import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CoordinatorQuotation from './components/CoordinatorQuotation';
import DecorQuotation from './components/DecorQuotation';
import PlanningQuotation from './components/PlanningQuotation';
import MainLayout from './layouts/mainLayout';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import BlogPost3 from './pages/BlogPost3';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import QuotationPage from './pages/QuotationPage';
import RegisterPage from './pages/Register';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quotation" element={<QuotationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/1" element={<BlogPost1 />} />
          <Route path="/blog/2" element={<BlogPost2 />} />
          <Route path="/blog/3" element={<BlogPost3 />} />
          <Route path="/services/1" element={<PlanningQuotation />} />
          <Route path="/services/2" element={<DecorQuotation />} />
          <Route path="/services/3" element={<CoordinatorQuotation />} />
          {/* 404 route phải ở cuối cùng */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
