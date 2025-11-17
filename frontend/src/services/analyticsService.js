import api from './api';

export const trackPageView = async ({ path, referrer = '', source = 'website', sessionId }) => {
  try {
    const payload = {
      path,
      referrer,
      source,
      sessionId,
    };

    await api.post('/analytics/track', payload);
  } catch (error) {
    // silent fail to avoid blocking UI
    if (import.meta.env.DEV) {
      console.warn('Analytics tracking failed:', error?.message);
    }
  }
};

export const getTrafficStats = async (range = 7) => {
  const response = await api.get(`/admin/traffic?range=${range}`);
  return response.data.data;
};


