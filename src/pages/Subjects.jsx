import { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../context/DataContext'
import SubjectCard from '../components/SubjectCard'
import EmptyState from '../components/EmptyState'

export default function Subjects() {
  const { subjects } = useData()
  const [q, setQ] = useState('')
  const list = subjects.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.code.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <div className="page-header"><h1>My Subjects</h1><p>All your enrolled courses in one place.</p></div>
      <div className="navbar-search" style={{ maxWidth: 460, marginBottom: 20 }}>
        <Search size={16} style={{ color: 'var(--text-3)' }} />
        <input placeholder="Search subjects..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {list.length === 0 ? <EmptyState title="No subjects found" /> :
        <div className="grid grid-3">{list.map(s => <SubjectCard key={s.id} subject={s} />)}</div>}
    </>
  )
}