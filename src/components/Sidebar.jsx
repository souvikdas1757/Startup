import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, FileText, ClipboardList, Code2, FileCode, Megaphone, Bookmark, LogOut, FileDown, Presentation, Table } from 'lucide-react'
import Avatar from './Avatar'
import { useAuth } from '../context/AuthContext'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/subjects', label: 'My Subjects', icon: BookOpen },
  { to: '/notes', label: 'Notes', icon: FileText },
  { to: '/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/coding', label: 'Coding', icon: Code2 },
  { to: '/documentation', label: 'Documentation', icon: FileCode },
  { to: '/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
]

export default function Sidebar({ collapsed, mobileOpen, onClose }) {
  const { user } = useAuth()
  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">📖</div>
        <div>
          <div className="brand">NEXORA</div>
          <div className="subtitle">Share & Learn Together</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Navigation</div>
        {nav.map(n => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <n.icon size={17} /><span>{n.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Quick Filters</div>
        <NavLink to="/notes?filter=recent" className="nav-item"><BookOpen size={17} /><span>Recent</span></NavLink>
        <NavLink to="/notes?filter=popular" className="nav-item"><BookOpen size={17} /><span>Popular</span></NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">File Types</div>
        <NavLink to="/notes?type=pdf" className="nav-item"><FileDown size={17} /><span>PDFs</span></NavLink>
        <NavLink to="/notes?type=doc" className="nav-item"><FileText size={17} /><span>Documents</span></NavLink>
        <NavLink to="/notes?type=ppt" className="nav-item"><Presentation size={17} /><span>Presentations</span></NavLink>
        <NavLink to="/notes?type=xls" className="nav-item"><Table size={17} /><span>Spreadsheets</span></NavLink>
      </div>

      <NavLink to="/profile" className="user-card">
        <Avatar name={user.name} />
        <div className="user-meta">
          <div className="name">{user.name}</div>
          <div className="role">Student</div>
        </div>
      </NavLink>
    </aside>
  )
}