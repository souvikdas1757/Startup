import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Input, Select, Textarea } from '../../components/Input'

const blank = { title: '', subject: '', due: '', status: 'pending', description: '', marks: 10 }

export default function AdminAssignments() {
  const { assignments, subjects, addAssignment, updateAssignment, removeAssignment } = useData()
  const { toast } = useToast()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [confirm, setConfirm] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const save = () => {
    if (!form.title || !form.subject) { toast('Title and subject required', 'error'); return }
    if (editing === 'new') { addAssignment(form); toast('Assignment added', 'success') }
    else { updateAssignment(editing, form); toast('Assignment updated', 'success') }
    setEditing(null)
  }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div><h1>Assignments</h1><p>Create and manage coursework.</p></div>
        <Button onClick={() => { setEditing('new'); setForm(blank) }}><Plus size={16} /> Add Assignment</Button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Subject</th><th>Due</th><th>Status</th><th>Marks</th><th>Actions</th></tr></thead>
        <tbody>{assignments.map(a => (
          <tr key={a.id}>
            <td style={{ fontWeight: 600 }}>{a.title}</td><td>{a.subject}</td><td>{a.due}</td>
            <td><span className={`badge ${a.status}`}>{a.status}</span></td><td>{a.marks}</td>
            <td><div style={{ display: 'flex', gap: 8 }}>
              <button className="icon-btn" onClick={() => { setEditing(a.id); setForm(a) }}><Pencil size={15} /></button>
              <button className="icon-btn" onClick={() => setConfirm(a)} style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
            </div></td>
          </tr>))}</tbody>
      </table>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add Assignment' : 'Edit Assignment'}
        footer={<><Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} />
        <Select label="Subject" value={form.subject} onChange={e => set('subject', e.target.value)}>
          <option value="">Select</option>{subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </Select>
        <Input label="Due Date" type="date" value={form.due} onChange={e => set('due', e.target.value)} />
        <Textarea label="Description" value={form.description} onChange={e => set('description', e.target.value)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Select label="Status" value={form.status} onChange={e => set('status', e.target.value)}>
            {['pending', 'submitted', 'graded'].map(s => <option key={s}>{s}</option>)}
          </Select>
          <Input label="Marks" type="number" value={form.marks} onChange={e => set('marks', +e.target.value)} />
        </div>
      </Modal>

      <ConfirmDialog open={!!confirm} title="Delete Assignment" message={`Delete "${confirm?.title}"?`}
        onCancel={() => setConfirm(null)} onConfirm={() => { removeAssignment(confirm.id); toast('Assignment deleted', 'success'); setConfirm(null) }} confirmText="Delete" />
    </>
  )
}