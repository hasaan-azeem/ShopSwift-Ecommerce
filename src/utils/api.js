import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {},
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  // Only send adminToken for /admin/* routes.
  // All other routes (auth, products, orders, etc.) use the user token.
  const isAdminRoute = config.url?.startsWith('/admin');

  if (isAdminRoute && adminToken) {
    config.headers['Authorization'] = `Bearer ${adminToken}`;
  } else if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default api;