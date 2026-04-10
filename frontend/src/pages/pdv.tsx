'use client'

import { useState } from 'react'

export default function Pdv() {
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState('')

  function addToCart() {
    const product = { name: 'Produto ' + (cart.length + 1), price: Math.random() * 100 }
    const newCart = [...cart, product]
    setCart(newCart)
    setTotal(newCart.reduce((sum, item) => sum + item.price, 0))
  }

  function finishSale() {
    if (cart.length === 0) return
    setMessage('Venda realizada! Total: R$ ' + total.toFixed(2))
    setCart([])
    setTotal(0)
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>PDV - Ponto de Venda</h1>
      
      {message && <div style={{ padding: '15px', background: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '20px' }}>{message}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Produtos</h2>
          <button onClick={addToCart} style={{ padding: '15px 30px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
            + Adicionar Produto
          </button>
          
          <div style={{ marginTop: '20px' }}>
            {cart.map((item, i) => (
              <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name}</span>
                <span>R$ {item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ background: '#1f2937', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Total</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px' }}>R$ {total.toFixed(2)}</p>
          <button onClick={finishSale} disabled={cart.length === 0} style={{ padding: '15px 40px', background: cart.length === 0 ? '#6b7280' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', fontSize: '16px' }}>
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  )
}