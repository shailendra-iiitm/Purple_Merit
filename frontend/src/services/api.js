import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (invalid/expired tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Log the error for debugging
      console.error('401 Unauthorized Error:', {
        url: error.config?.url,
        method: error.config?.method,
        message: error.response?.data?.message,
        token: localStorage.getItem('token') ? 'Present' : 'Missing'
      });
      
      // Only auto-logout for auth endpoints, not for other protected routes
      // This allows us to see the actual error message
      if (error.config?.url?.includes('/auth/')) {
        localStorage.removeItem('token');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
  getAllUsers: (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`),
  activateUser: (userId) => api.put(`/users/${userId}/activate`),
  deactivateUser: (userId) => api.put(`/users/${userId}/deactivate`)
};

export default api;
