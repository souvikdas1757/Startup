import { useData } from '../../context/DataContext'
import { BookOpen, FileText, ClipboardList, Users, FileCode } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { subjects = [], notes = [], assignments = [], documentation = [] } = useData()

  const stats = [
    { label: 'Total Students', value: 8, icon: Users, to: '/admin/users' },
    { label: 'Total Subjects', value: subjects.length, icon: BookOpen, to: '/admin/subjects' },
    { label: 'Total Notes', value: notes.length, icon: FileText, to: '/admin/notes' },
    { label: 'Total Assignments', value: assignments.length, icon: ClipboardList, to: '/admin/assignments' },
    { label: 'Documentation', value: documentation.length, icon: FileCode, to: '/admin/documentation' },
  ]

  return (
    <>
      <div className="page-header"><h1>Admin Overview</h1><p>Key metrics across the platform.</p></div>
      <div className="grid grid-3">
        {stats.map(s => (
          <Link to={s.to} key={s.label} className="card stat-card">
            <div className="icon"><s.icon size={20} /></div>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
          </Link>
        ))}
      </div>
      <div className="section-header"><h2>Recent Uploaded Notes</h2></div>
      <table className="admin-table">
        <thead><tr><th>Title</th><th>Subject</th><th>Author</th><th>Date</th></tr></thead>
        <tbody>
          {notes.slice(0, 6).map(n => (
            <tr key={n.id}><td>{n.title}</td><td>{n.subjectId || 'N/A'}</td><td>{n.uploadedBy || 'Admin'}</td><td>{new Date(n.createdAt).toLocaleDateString()}</td></tr>
          ))}
          {notes.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center', padding: 20, color: 'var(--text-3)' }}>No notes uploaded yet.</td></tr>
          )}
        </tbody>
      </table>
    </>
  )
}