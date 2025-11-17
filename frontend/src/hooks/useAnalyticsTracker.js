import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/analyticsService';

let gaInitialized = false;

const useAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (measurementId && !gaInitialized) {
      ReactGA.initialize(measurementId);
      gaInitialized = true;
    }
  }, []);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const page = `${location.pathname}${location.search}`;
    let sessionId = sessionStorage.getItem('td_session');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem('td_session', sessionId);
    }

    if (gaInitialized && measurementId) {
      ReactGA.send({ hitType: 'pageview', page });
    }

    trackPageView({
      path: page,
      referrer: document.referrer,
      sessionId,
    });
  }, [location]);
};

export default useAnalyticsTracker;


