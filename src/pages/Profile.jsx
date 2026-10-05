import { useAuth } from '../context/AuthContext'
import { useBookmarks } from '../context/BookmarkContext'
import { getData } from '../utils/storage'
import Avatar from '../components/Avatar'

export default function Profile() {
  const { user } = useAuth()
  const { bookmarks } = useBookmarks()
  const solved = getData('nexora_solved', [])
  const stats = [
    { label: 'Notes Uploaded', value: 12 },
    { label: 'Assignments Submitted', value: 6 },
    { label: 'Bookmarks', value: bookmarks.notes.length + bookmarks.docs.length + bookmarks.problems.length },
    { label: 'Problems Solved', value: solved.length },
  ]
  return (
    <>
      <div className="page-header"><h1>Profile</h1><p>Your account information and activity.</p></div>

      <div className="card" style={{ padding: 24, display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
        <Avatar name={user.name} size="lg" />
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{user.name}</h2>
          <div style={{ color: 'var(--text-2)', marginTop: 4 }}>{user.email}</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 10, color: 'var(--text-3)', fontSize: 13 }}>
            <span>Branch: <b style={{ color: 'var(--text)' }}>{user.branch}</b></span>
            <span>Semester: <b style={{ color: 'var(--text)' }}>{user.semester}</b></span>
            <span>Section: <b style={{ color: 'var(--text)' }}>{user.section}</b></span>
          </div>
        </div>
      </div>

      <div className="grid grid-4">
        {stats.map(s => <div key={s.label} className="card stat-card"><div className="label">{s.label}</div><div className="value">{s.value}</div></div>)}
      </div>
    </>
  )
}