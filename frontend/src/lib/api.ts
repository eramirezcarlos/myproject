import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

export const authApi = {
  // Get CSRF cookie
  getCsrfCookie: () => api.get('/sanctum/csrf-cookie'),
  
  // Authentication endpoints
  login: (email: string, password: string) => 
    api.post('/login', { email, password }),
  
  register: (name: string, email: string, password: string, password_confirmation: string) =>
    api.post('/register', { name, email, password, password_confirmation }),
  
  logout: () => api.post('/logout'),
  
  // Get authenticated user
  getUser: () => api.get('/api/user'),
  
  // Password reset
  forgotPassword: (email: string) => 
    api.post('/forgot-password', { email }),
  
  resetPassword: (token: string, email: string, password: string, password_confirmation: string) =>
    api.post('/reset-password', { token, email, password, password_confirmation }),
};

export default api;