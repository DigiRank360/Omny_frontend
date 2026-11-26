import axios from 'axios';

// Get API URL dynamically based on current hostname at runtime
function getApiUrl() {
  const protocol = window.location.protocol; // http: or https:
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname.includes('localhost') || hostname === '127.0.0.1') {
    return `${protocol}//localhost:3002/api`;
  }
  
  // Production - use current hostname
  return `${protocol}//${hostname}/api`;
}

const baseURL = getApiUrl();
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
