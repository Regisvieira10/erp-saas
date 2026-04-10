import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

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
  login: (email: string, password: string, domain: string) => 
    api.post('/auth/login', { email, password, tenantDomain: domain }),
  register: (data: any) => api.post('/auth/register', data),
}

export const productAPI = {
  getAll: (tenantId: string, categoryId?: string) => 
    api.get('/products', { params: { tenantId, categoryId } }),
  get: (id: string, tenantId: string) => 
    api.get(`/products/${id}`, { params: { tenantId } }),
  create: (data: any, tenantId: string) => 
    api.post('/products', data, { params: { tenantId } }),
  update: (id: string, data: any, tenantId: string) => 
    api.put(`/products/${id}`, data, { params: { tenantId } }),
  delete: (id: string, tenantId: string) => 
    api.delete(`/products/${id}`, { params: { tenantId } }),
}

export const cartAPI = {
  get: (sessionId: string, tenantId: string) => 
    api.get('/cart', { params: { sessionId, tenantId } }),
  addItem: (data: any) => api.post('/cart/add', data),
  updateQuantity: (itemId: string, quantity: number) => 
    api.put(`/cart/item/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/item/${itemId}`),
  clear: (sessionId: string, tenantId: string) => 
    api.delete('/cart/clear', { params: { sessionId, tenantId } }),
  checkout: (data: any) => api.post('/cart/checkout', data),
}

export const orderAPI = {
  getAll: (tenantId: string, status?: string) => 
    api.get('/admin/orders', { params: { tenantId, status } }),
  getStats: (tenantId: string) => 
    api.get('/admin/orders/stats', { params: { tenantId } }),
  get: (id: string, tenantId: string) => 
    api.get(`/admin/orders/${id}`, { params: { tenantId } }),
  updateStatus: (id: string, status: string, tenantId: string) => 
    api.put(`/admin/orders/${id}/status`, { status }, { params: { tenantId } }),
}

export const tenantAPI = {
  getPublic: (domain: string) => api.get(`/tenant/${domain}/public`),
  update: (id: string, data: any) => api.put(`/tenant`, data, { params: { id } }),
}

export const invoiceAPI = {
  getAll: (tenantId: string) => api.get('/invoices', { params: { tenantId } }),
  get: (id: string) => api.get(`/invoices/${id}`),
  create: (data: any, tenantId: string) => api.post('/invoices', data, { params: { tenantId } }),
  emit: (id: string) => api.post(`/invoices/${id}/emit`),
  cancel: (id: string, reason: string) => api.post(`/invoices/${id}/cancel`, { reason }),
  getXml: (id: string) => api.get(`/invoices/${id}/xml`),
  getPdf: (id: string) => api.get(`/invoices/${id}/pdf`),
}

export const pdvAPI = {
  status: (tenantId: string) => api.get('/pdv/status', { params: { tenantId } }),
  open: (data: any) => api.post('/pdv/open', data),
  close: (data: any) => api.post('/pdv/close', data),
  addItem: (data: any) => api.post('/pdv/item', data),
  removeItem: (itemId: string) => api.delete(`/pdv/item/${itemId}`),
  finish: (data: any) => api.post('/pdv/finish', data),
  history: (tenantId: string, date?: string) => api.get('/pdv/history', { params: { tenantId, date } }),
  report: (tenantId: string, cashId: string) => api.get('/pdv/report', { params: { tenantId, cashId } }),
}

export const reportAPI = {
  sales: (tenantId: string, startDate?: string, endDate?: string) => 
    api.get('/reports/sales', { params: { tenantId, startDate, endDate } }),
  products: (tenantId: string) => 
    api.get('/reports/products', { params: { tenantId } }),
  customers: (tenantId: string) => 
    api.get('/reports/customers', { params: { tenantId } }),
  revenue: (tenantId: string, days?: string) => 
    api.get('/reports/revenue', { params: { tenantId, days } }),
  dashboard: (tenantId: string) => 
    api.get('/reports/dashboard', { params: { tenantId } }),
}

export const crmAPI = {
  leads: (tenantId: string, status?: string) => 
    api.get('/crm/leads', { params: { tenantId, status } }),
  createLead: (data: any, tenantId: string) => 
    api.post('/crm/leads', data, { params: { tenantId } }),
  deleteLead: (id: string, tenantId: string) => 
    api.delete(`/crm/leads/${id}`, { params: { tenantId } }),
  
  deals: (tenantId: string, stage?: string) => 
    api.get('/crm/deals', { params: { tenantId, stage } }),
  pipeline: (tenantId: string) => 
    api.get('/crm/deals/pipeline', { params: { tenantId } }),
  createDeal: (data: any, tenantId: string) => 
    api.post('/crm/deals', data, { params: { tenantId } }),
  moveDealStage: (id: string, stage: string) => 
    api.put(`/crm/deals/${id}/stage`, { stage }),
  
  tasks: (tenantId: string, userId?: string) => 
    api.get('/crm/tasks', { params: { tenantId, userId } }),
  createTask: (data: any, tenantId: string) => 
    api.post('/crm/tasks', data, { params: { tenantId } }),
  completeTask: (id: string) => 
    api.post(`/crm/tasks/${id}/complete`),
  
  activities: (tenantId: string, leadId?: string) => 
    api.get('/crm/activities', { params: { tenantId, leadId } }),
  notes: (tenantId: string, leadId?: string) => 
    api.get('/crm/notes', { params: { tenantId, leadId } }),
  
  dashboard: (tenantId: string) => 
    api.get('/crm/dashboard', { params: { tenantId } }),
}

export default api