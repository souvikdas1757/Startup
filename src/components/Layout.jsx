import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setMobileOpen(false); window.scrollTo(0, 0) }, [pathname])
  return (
    <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} style={{ zIndex: 80 }} />}
      <div className="app-main">
        <Navbar onToggleSidebar={() => setCollapsed(c => !c)} onToggleMobile={() => setMobileOpen(o => !o)} />
        <main className="app-content"><Outlet /></main>
      </div>
    </div>
  )
}