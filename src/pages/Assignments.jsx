import { useState } from 'react'
import { useData } from '../context/DataContext'
import AssignmentCard from '../components/AssignmentCard'
import EmptyState from '../components/EmptyState'

export default function Assignments() {
  const { assignments } = useData()
  const [tab, setTab] = useState('All')
  const list = tab === 'All' ? assignments : assignments.filter(a => a.status === tab.toLowerCase())
  return (
    <>
      <div className="page-header"><h1>Assignments</h1><p>Track all your coursework and submissions.</p></div>
      <div className="chips">
        {['All', 'Pending', 'Submitted', 'Graded'].map(t => <button key={t} className={`chip ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      {list.length === 0 ? <EmptyState title="No assignments here" /> :
        <div className="grid grid-2">{list.map(a => <AssignmentCard key={a.id} assignment={a} />)}</div>}
    </>
  )
}