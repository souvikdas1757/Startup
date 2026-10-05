import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Input, Select, Textarea } from '../../components/Input'

const blank = { name: '', code: '', teacher: '', semester: 3, branch: 'Computer Science', section: 'A', description: '' }
export default function AdminSubjects() {
  const { subjects, addSubject, updateSubject, removeSubject } = useData()
  const { toast } = useToast()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [confirm, setConfirm] = useState(null)

  const openAdd = () => { setEditing('new'); setForm(blank) }
  const openEdit = (s) => { setEditing(s.id); setForm(s) }
  
  const save = async () => {
  if (!form.name || !form.code) { toast('Name and code required', 'error'); return }
  try {
    // Only send the fields Prisma expects
    const payload = {
      name: form.name,
      code: form.code,
      teacher: form.teacher,
      semester: form.semester,
      branch: form.branch,
      section: form.section,
      description: form.description,
    }
    if (editing === 'new') { 
      await addSubject(payload); 
      toast('Subject added successfully', 'success') 
    } else { 
      await updateSubject(editing, payload); 
      toast('Subject updated successfully', 'success') 
    }
    setEditing(null)
  } catch (error) {
    toast(error.response?.data?.message || 'Error saving subject', 'error')
  }
}

  const handleDelete = async () => {
    try {
      await removeSubject(confirm.id)
      toast('Subject deleted successfully', 'success')
      setConfirm(null)
    } catch (error) {
      toast(error.response?.data?.message || 'Error deleting subject', 'error')
    }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div><h1>Subjects</h1><p>Add, edit, and delete subjects across the platform.</p></div>
        <Button onClick={openAdd}><Plus size={16} /> Add Subject</Button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Subject</th><th>Code</th><th>Semester</th><th>Branch</th><th>Section</th><th>Teacher</th><th>Actions</th></tr></thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.id}>
              <td style={{ fontWeight: 600 }}>{s.name}</td>
              <td>{s.code}</td><td>Sem {s.semester}</td><td>{s.branch}</td><td>{s.section}</td><td>{s.teacher}</td>
              <td>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="icon-btn" onClick={() => openEdit(s)}><Pencil size={15} /></button>
                  <button className="icon-btn" onClick={() => setConfirm(s)} style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add Subject' : 'Edit Subject'}
        footer={<><Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <Input label="Subject Name" value={form.name} onChange={e => set('name', e.target.value)} />
        <Input label="Subject Code" value={form.code} onChange={e => set('code', e.target.value)} />
        <Textarea label="Description" value={form.description} onChange={e => set('description', e.target.value)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Select label="Semester" value={form.semester} onChange={e => set('semester', +e.target.value)}>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
          </Select>
          <Select label="Section" value={form.section} onChange={e => set('section', e.target.value)}>
            {['A','B','C','D','E'].map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
        <Select label="Branch" value={form.branch} onChange={e => set('branch', e.target.value)}>
          {['Computer Science', 'Electronics', 'Mechanical', 'Civil'].map(b => <option key={b} value={b}>{b}</option>)}
        </Select>
        <Input label="Teacher" value={form.teacher} onChange={e => set('teacher', e.target.value)} />
      </Modal>

      <ConfirmDialog open={!!confirm} title="Delete Subject" message={`Delete "${confirm?.name}"? This action cannot be undone.`}
        onCancel={() => setConfirm(null)} onConfirm={handleDelete} confirmText="Delete" />
    </>
  )
}