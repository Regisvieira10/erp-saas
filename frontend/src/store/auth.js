import { create } from 'zustand'

const getStorage = (key) => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(key)
}

export const useAuthStore = create((set) => ({
  token: getStorage('token'),
  user: JSON.parse(getStorage('user') || 'null'),
  tenant: JSON.parse(getStorage('tenant') || 'null'),
  domain: getStorage('domain') || '',

  setAuth: (token, user, tenant, domain) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('tenant', JSON.stringify(tenant))
      localStorage.setItem('domain', domain)
    }
    set({ token, user, tenant, domain })
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('tenant')
      localStorage.removeItem('domain')
    }
    set({ token: null, user: null, tenant: null, domain: '' })
  },
}))