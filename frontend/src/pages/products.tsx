'use client'

import { useEffect, useState } from 'react'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const token = localStorage.getItem('token')
    const tenant = JSON.parse(localStorage.getItem('tenant') || '{}')
    if (!token || !tenant.id) return
    
    try {
      const res = await fetch(`http://localhost:3001/api/products?tenantId=${tenant.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function addProduct(e: any) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const tenant = JSON.parse(localStorage.getItem('tenant') || '{}')
    
    try {
      await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name, price: parseFloat(price), tenantId: tenant.id })
      })
      setName('')
      setPrice('')
      loadProducts()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Produtos</h1>
      
      <form onSubmit={addProduct} style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }} />
          <input placeholder="Preço" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '120px' }} />
          <button type="submit" style={{ padding: '8px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Adicionar</button>
        </div>
      </form>

      {loading ? <p>Carregando...</p> : (
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Nome</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Preço</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{p.name}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>R$ {p.price?.toFixed(2)}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={2} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Nenhum produto cadastrado</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}