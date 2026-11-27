import axios from 'axios';

// Detect API URL at runtime (not build time) to support multiple environments
const getBaseURL = () => {
  // If build-time env var is set and not localhost, use it
  if (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost')) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For production domain, use production API
  if (typeof window !== 'undefined' && !['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
    // Use same domain as frontend for API calls
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${protocol}//${hostname}${port}/api`;
  }
  
  // Fallback for local development
  return import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
};

const baseURL = getBaseURL();

const api = axios.create({ baseURL });

export const bannerImageUrl = imageUrl => new URL(imageUrl, new URL(baseURL, window.location.origin).origin).href;

api.interceptors.request.use(c => {
  const t = localStorage.getItem('omnyx_admin_token');
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});

export const dealerApi = axios.create({ baseURL });
dealerApi.interceptors.request.use(config => {
  const token = localStorage.getItem('omnyx_dealer_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const errMsg = e => e?.response?.data?.message || e.message || 'Something went wrong';
export default api;
