import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CoordinatorQuotation from './components/CoordinatorQuotation';
import DecorQuotation from './components/DecorQuotation';
import PlanningQuotation from './components/PlanningQuotation';
import MainLayout from './layouts/mainLayout';
import AboutPage from './pages/AboutPage';
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
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/quotation" element={<QuotationPage />} />
          <Route path="/services/1" element={<PlanningQuotation />} />
          <Route path="/services/2" element={<DecorQuotation />} />
          <Route path="/services/3" element={<CoordinatorQuotation />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
