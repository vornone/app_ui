// apiService.ts
import apiClient, { csrfClient } from './apiClient';

export const apiService = {
  getAll: (resource: string, params = {}) => apiClient.get(`/${resource}`, { params }),
  getById: (resource: string, id: string | number) => apiClient.get(`/${resource}/${id}`),
  getByParams: (resource: string, params: Record<string, any>) => apiClient.get(`/${resource}`, { params }),
  create: (resource: string, data: any) => apiClient.post(`/${resource}`, data),
  update: (resource: string, id: string | number, data: any) => apiClient.put(`/${resource}/${id}`, data),
  remove: (resource: string, id: string | number) => apiClient.delete(`/${resource}/${id}`),

  // Get CSRF cookie from the correct endpoint
  getCsrfCookie: () => csrfClient.get('/sanctum/csrf-cookie'),

  login: async (credentials: { name: string; password: string }) => {
    // Get CSRF cookie first
    await csrfClient.get('/sanctum/csrf-cookie');
    return apiClient.post('/login', credentials);
  },

  logout: async () => {
    await csrfClient.get('/sanctum/csrf-cookie');
    return apiClient.post('/logout');
  },

  getCurrentUser: () => apiClient.get('/user'),

  register: async (data: any) => {
    await csrfClient.get('/sanctum/csrf-cookie');
    return apiClient.post('/register', data);
  },
};

export default apiService;
