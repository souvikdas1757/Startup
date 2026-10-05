import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, FileText, ClipboardList, FileCode, Megaphone, Users, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/subjects', label: 'Subjects', icon: BookOpen },
  { to: '/admin/notes', label: 'Notes', icon: FileText },
  { to: '/admin/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/admin/documentation', label: 'Documentation', icon: FileCode },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/users', label: 'Users', icon: Users },
]

export default function AdminLayout() {
  const { adminLogout, admin } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const logout = () => { adminLogout(); toast('Logged out', 'info'); navigate('/admin/login') }

  return (
    <div className="admin-shell">
      <aside className="sidebar" style={{ width: 240 }}>
        <div className="sidebar-logo">
          <div className="logo-mark">📖</div>
          <div><div className="brand">NEXORA</div><div className="subtitle">Admin Panel</div></div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Manage</div>
          {links.map(l => <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><l.icon size={17} /><span>{l.label}</span></NavLink>)}
        </div>
        <div className="user-card">
          <div className="avatar">A</div>
          <div className="user-meta"><div className="name">Admin</div><div className="role">{admin?.email}</div></div>
          <button className="logout" onClick={logout}><LogOut size={16} /></button>
        </div>
      </aside>
      <div className="admin-main">
        <div className="navbar">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Admin Console</h2>
          <div className="spacer" />
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>View Student Site</button>
        </div>
        <main className="app-content"><Outlet /></main>
      </div>
    </div>
  )
}