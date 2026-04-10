import type { AppProps } from 'next/app'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', background: '#1f2937', color: 'white', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>ERP SaaS</h2>
        <nav>
          <Link href="/" style={{ display: 'block', padding: '10px 0', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/products" style={{ display: 'block', padding: '10px 0', color: 'white', textDecoration: 'none' }}>Produtos</Link>
          <Link href="/orders" style={{ display: 'block', padding: '10px 0', color: 'white', textDecoration: 'none' }}>Pedidos</Link>
          <Link href="/pdv" style={{ display: 'block', padding: '10px 0', color: 'white', textDecoration: 'none' }}>PDV</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '20px' }}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}