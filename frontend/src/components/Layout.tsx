'use client'

import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { tenant, logout } = useAuthStore()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-lg">{tenant?.name || 'ERP SaaS'}</div>
        <nav className="flex-1 p-4">
          <Link href="/" className="block py-2 hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/orders" className="block py-2 hover:text-gray-300">
            Pedidos
          </Link>
          <Link href="/products" className="block py-2 hover:text-gray-300">
            Produtos
          </Link>
          <Link href="/invoices" className="block py-2 hover:text-gray-300">
            NF-e
          </Link>
          <Link href="/pdv" className="block py-2 hover:text-gray-300">
            PDV
          </Link>
          <Link href="/reports" className="block py-2 hover:text-gray-300">
            Relatórios
          </Link>
          <Link href="/crm" className="block py-2 hover:text-gray-300">
            CRM
          </Link>
          <a 
            href={`/${tenant?.domain}`}
            target="_blank" className="block py-2 hover:text-gray-300">
            Ver Loja
          </a>
        </nav>
        <button onClick={handleLogout} className="p-4 bg-red-600 hover:bg-red-700">
          Sair
        </button>
      </aside>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}