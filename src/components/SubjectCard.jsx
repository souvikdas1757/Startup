import { BookOpen, ClipboardList, FileText, User } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function SubjectCard({ subject }) {
  return (
    <Link to={`/subjects/${subject.id}`} className="card subject-card">
      <div className="head">
        <div className="icon"><BookOpen size={20} /></div>
        <span className="code">{subject.code}</span>
      </div>
      <div>
        <h3>{subject.name}</h3>
        <p className="desc">{subject.description}</p>
      </div>
      <div className="meta">
        <span><User size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />{subject.teacher}</span>
      </div>
      <div className="meta" style={{ borderTop: 'none', paddingTop: 0 }}>
        <span><FileText size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /><b>{subject.notes}</b> notes</span>
        <span><ClipboardList size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /><b>{subject.assignments}</b> assignments</span>
      </div>
    </Link>
  )
}