import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function Layout() {
  const { tenant, logout } = useAuthStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">{tenant?.name || 'ERP SaaS'}</div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/customers">Clientes</Link>
          <Link to="/orders">Pedidos</Link>
          <Link to="/accounts">Financeiro</Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}