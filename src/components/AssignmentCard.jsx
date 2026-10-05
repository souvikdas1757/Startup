import { Calendar, CheckCircle, Clock } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'

export default function AssignmentCard({ assignment }) {
  const { updateAssignment } = useData()
  const { toast } = useToast()
  const submit = () => {
    updateAssignment(assignment.id, { status: 'submitted' })
    toast(`Submitted: ${assignment.title}`, 'success')
  }
  return (
    <div className="card assignment-card">
      <div className="row">
        <h3 style={{ flex: 1 }}>{assignment.title}</h3>
        <Badge type={assignment.status}>{assignment.status}</Badge>
      </div>
      <p style={{ color: 'var(--text-2)', fontSize: 13 }}>{assignment.description}</p>
      <div className="row" style={{ fontSize: 12.5, color: 'var(--text-3)' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{assignment.subject}</span>
        <span className="due"><Calendar size={13} /> Due {assignment.due}</span>
        <span>· {assignment.marks} marks</span>
      </div>
      <div className="row" style={{ marginTop: 4 }}>
        <Button variant="ghost" size="sm">View Assignment</Button>
        {assignment.status === 'pending' && <Button size="sm" onClick={submit}><CheckCircle size={14} /> Submit</Button>}
      </div>
    </div>
  )
}