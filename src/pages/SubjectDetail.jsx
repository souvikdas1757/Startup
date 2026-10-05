import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Tabs from '../components/Tabs'
import NoteCard from '../components/NoteCard'
import AssignmentCard from '../components/AssignmentCard'
import AnnouncementCard from '../components/AnnouncementCard'
import EmptyState from '../components/EmptyState'
import { BookOpen, User, Calendar } from 'lucide-react'

export default function SubjectDetail() {
  const { id } = useParams()
  const { subjects, notes, assignments, announcements } = useData()
  const subject = subjects.find(s => s.id === id)
  const [tab, setTab] = useState('Overview')
  if (!subject) return <EmptyState title="Subject not found" />

  const subNotes = notes.filter(n => n.subject === subject.name)
  const subAssign = assignments.filter(a => a.subject === subject.name)

  return (
    <>
      <div className="page-header" style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ width: 60, height: 60, borderRadius: 14, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>
          <BookOpen size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <h1>{subject.name}</h1>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, color: 'var(--text-2)', fontSize: 13, flexWrap: 'wrap' }}>
            <span className="badge-tag" style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>{subject.code}</span>
            <span><Calendar size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Semester {subject.semester}</span>
            <span>{subject.branch}</span>
            <span><User size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />{subject.teacher}</span>
          </div>
        </div>
      </div>

      <Tabs tabs={['Overview', 'Notes', 'Assignments', 'Resources', 'Announcements']} active={tab} onChange={setTab} />

      <div style={{ marginTop: 24 }}>
        {tab === 'Overview' && (
          <div className="grid grid-2">
            <div className="card" style={{ padding: 22 }}>
              <h2 style={{ fontSize: 16, marginBottom: 10 }}>Course Description</h2>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{subject.description}</p>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: 'var(--text-2)' }}>Progress</span>
                  <b>62%</b>
                </div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '62%', background: 'var(--primary)' }} />
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 22 }}>
              <h2 style={{ fontSize: 16, marginBottom: 10 }}>Upcoming Assignments</h2>
              {subAssign.filter(a => a.status === 'pending').slice(0, 3).map(a => (
                <div key={a.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 600 }}>{a.title}</div>
                  <div style={{ color: 'var(--text-3)', fontSize: 12 }}>Due {a.due}</div>
                </div>
              ))}
              {subAssign.filter(a => a.status === 'pending').length === 0 && <EmptyState title="All caught up!" />}
            </div>
          </div>
        )}
        {tab === 'Notes' && (subNotes.length ? <div className="grid grid-3">{subNotes.map(n => <NoteCard key={n.id} note={n} />)}</div> : <EmptyState title="No notes yet" />)}
        {tab === 'Assignments' && (subAssign.length ? <div className="grid grid-2">{subAssign.map(a => <AssignmentCard key={a.id} assignment={a} />)}</div> : <EmptyState title="No assignments yet" />)}
        {tab === 'Resources' && <EmptyState title="Resources coming soon" subtitle="Reference books and links will appear here." />}
        {tab === 'Announcements' && <div className="grid grid-2">{announcements.slice(0, 3).map(a => <AnnouncementCard key={a.id} a={a} />)}</div>}
      </div>
    </>
  )
}