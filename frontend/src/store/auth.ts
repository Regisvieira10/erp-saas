import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Tenant {
  id: string
  name: string
  domain: string
}

interface AuthState {
  token: string | null
  user: User | null
  tenant: Tenant | null
  domain: string

  setAuth: (token: string, user: User, tenant: Tenant, domain: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  tenant: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tenant') || 'null') : null,
  domain: typeof window !== 'undefined' ? localStorage.getItem('domain') || '' : '',

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