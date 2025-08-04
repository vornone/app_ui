// apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Create a separate client for CSRF requests (no /api prefix)
const csrfClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);

export default apiClient;
export { csrfClient };
