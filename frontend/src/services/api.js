import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const tenantId = localStorage.getItem('tenantId')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (tenantId) config.headers['x-tenant-id'] = tenantId
  return config
})

export const authAPI = {
  login: (email, password, domain) => api.post('/auth/login', { email, password, domain }),
  register: (data) => api.post('/auth/register', data),
}

export const productAPI = {
  getAll: () => api.get('/products'),
  get: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
}

export const customerAPI = {
  getAll: () => api.get('/customers'),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
}

export const orderAPI = {
  getAll: () => api.get('/orders'),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
}

export const accountAPI = {
  getAll: () => api.get('/accounts'),
  create: (data) => api.post('/accounts', data),
  getMovements: (id) => api.get(`/accounts/${id}/movements`),
  createMovement: (id, data) => api.post(`/accounts/${id}/movements`, data),
}

export default api