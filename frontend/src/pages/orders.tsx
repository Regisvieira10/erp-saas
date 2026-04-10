'use client'

import { useEffect, useState } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    const token = localStorage.getItem('token')
    const tenant = JSON.parse(localStorage.getItem('tenant') || '{}')
    if (!token || !tenant.id) return
    
    try {
      const res = await fetch(`http://localhost:3001/api/orders?tenantId=${tenant.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Pedidos</h1>

      {loading ? <p>Carregando...</p> : (
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Número</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Cliente</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Total</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{o.orderNumber}</td>
                  <td style={{ padding: '12px' }}>{o.customerName}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>R$ {o.total?.toFixed(2)}</td>
                  <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: o.status === 'PENDING' ? '#fef3c7' : '#d1fae5', color: o.status === 'PENDING' ? '#92400e' : '#065f46' }}>{o.status}</span></td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Nenhum pedido encontrado</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}