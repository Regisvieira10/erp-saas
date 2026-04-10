'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setAuthenticated(!!token)
    setLoading(false)
  }, [])

  if (loading) {
    return <div style={{ padding: '20px' }}>Carregando...</div>
  }

  if (!authenticated) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Bem-vindo ao ERP SaaS!</h1>
        <p>Faça login para acessar o sistema.</p>
        <Link href="/login" style={{ display: 'inline-block', padding: '10px 20px', background: '#2563eb', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Login
        </Link>
      </div>
    )
  }

  const tenant = JSON.parse(localStorage.getItem('tenant') || '{}')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard - {tenant.name || 'ERP SaaS'}</h1>
      <p>Bem-vindo, {user.name || 'Usuário'}!</p>
      
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '14px' }}>Total de Pedidos</h3>
          <p style={{ fontSize: '30px', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '14px' }}>Receita Total</h3>
          <p style={{ fontSize: '30px', fontWeight: 'bold' }}>R$ 0</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <Link href="/orders" style={{ marginRight: '15px', padding: '8px 16px', background: '#2563eb', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
          Ver Pedidos
        </Link>
        <Link href="/products" style={{ marginRight: '15px', padding: '8px 16px', background: '#2563eb', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
          Produtos
        </Link>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login' }} style={{ padding: '8px 16px', background: '#dc2626', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
          Sair
        </button>
      </div>
    </div>
  )
}