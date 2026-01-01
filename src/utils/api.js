import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend API from .env
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (adminToken) config.headers['Authorization'] = `Bearer ${adminToken}`;
  return config;
});

export default api;
