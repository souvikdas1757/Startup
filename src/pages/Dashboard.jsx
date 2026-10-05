import { BookOpen, FileText, ClipboardList, Code2, TrendingUp, FileCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import SubjectCard from '../components/SubjectCard'
import NoteCard from '../components/NoteCard'
import AssignmentCard from '../components/AssignmentCard'
import AnnouncementCard from '../components/AnnouncementCard'

export default function Dashboard() {
  const { user } = useAuth()
  const { subjects, notes, assignments, announcements } = useData()
  const recent = [...notes].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)).slice(0, 3)
  const upcoming = assignments.filter(a => a.status === 'pending').slice(0, 3)
  const latestAnn = announcements.slice(0, 3)
  const popular = [...notes].sort((a, b) => b.downloads - a.downloads).slice(0, 3)

  return (
    <>
      <div className="page-header">
        <h1>Welcome back, {user.name.split(' ')[0]} 👋</h1>
        <p>Continue your learning journey.</p>
      </div>

      <div className="grid grid-4">
        <div className="card stat-card"><div className="icon"><BookOpen size={20} /></div><div className="label">Subjects</div><div className="value">{subjects.length}</div></div>
        <div className="card stat-card"><div className="icon"><FileText size={20} /></div><div className="label">Notes Available</div><div className="value">{notes.length}</div></div>
        <div className="card stat-card"><div className="icon"><ClipboardList size={20} /></div><div className="label">Pending Tasks</div><div className="value">{upcoming.length}</div></div>
        <div className="card stat-card"><div className="icon"><TrendingUp size={20} /></div><div className="label">Downloads</div><div className="value">{notes.reduce((s, n) => s + n.downloads, 0)}</div></div>
      </div>

      <div className="section-header"><h2>My Subjects</h2><Link to="/subjects" className="link">View all →</Link></div>
      <div className="grid grid-3">{subjects.slice(0, 6).map(s => <SubjectCard key={s.id} subject={s} />)}</div>

      <div className="section-header"><h2>Recent Notes</h2><Link to="/notes" className="link">View all →</Link></div>
      <div className="grid grid-3">{recent.map(n => <NoteCard key={n.id} note={n} />)}</div>

      <div className="section-header"><h2>Upcoming Assignments</h2><Link to="/assignments" className="link">View all →</Link></div>
      <div className="grid grid-2">{upcoming.map(a => <AssignmentCard key={a.id} assignment={a} />)}</div>

      <div className="section-header"><h2>Latest Announcements</h2><Link to="/announcements" className="link">View all →</Link></div>
      <div className="grid grid-2">{latestAnn.map(a => <AnnouncementCard key={a.id} a={a} />)}</div>

      <div className="section-header"><h2>Popular Resources</h2><Link to="/notes" className="link">Explore →</Link></div>
      <div className="grid grid-3">{popular.map(n => <NoteCard key={n.id} note={n} />)}</div>
    </>
  )
}