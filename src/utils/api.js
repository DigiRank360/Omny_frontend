import axios from 'axios';

// Determine if we're in production (via domain) or development (localhost)
const isProduction = !window.location.hostname.includes('localhost') && !window.location.hostname === '127.0.0.1';
const baseURL = isProduction 
  ? (import.meta.env.VITE_API_URL_PROD || 'https://omnyxglobal.com:5006/api')
  : (import.meta.env.VITE_API_URL || 'http://localhost:5006/api');

const api = axios.create({ baseURL });
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
