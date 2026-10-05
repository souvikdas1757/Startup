import { useState } from 'react'
import { useData } from '../context/DataContext'
import AnnouncementCard from '../components/AnnouncementCard'
import EmptyState from '../components/EmptyState'

export default function Announcements() {
  const { announcements } = useData()
  const [tab, setTab] = useState('All')
  const list = tab === 'All' ? announcements : announcements.filter(a => a.type === tab.toLowerCase())
  return (
    <>
      <div className="page-header"><h1>Announcements</h1><p>Stay updated with the latest campus news.</p></div>
      <div className="chips">
        {['All', 'Urgent', 'Important', 'Normal'].map(t => <button key={t} className={`chip ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      {list.length === 0 ? <EmptyState title="No announcements" /> :
        <div className="grid grid-2">{list.map(a => <AnnouncementCard key={a.id} a={a} />)}</div>}
    </>
  )
}