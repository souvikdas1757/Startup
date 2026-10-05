import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Input, Select, Textarea } from '../../components/Input'

const blank = { title: '', description: '', author: 'Admin', subject: '', subjectId: '', semester: 3, section: 'A', branch: 'Computer Science', fileType: 'pdf', size: '1.0 MB', downloads: 0, views: 0, cover: 'red' }

export default function AdminNotes() {
  const { notes, subjects, addNote, updateNote, removeNote } = useData()
  const { toast } = useToast()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [confirm, setConfirm] = useState(null)

  const save = () => {
    if (!form.title || !form.subject) { toast('Title and subject required', 'error'); return }
    if (editing === 'new') { addNote({ ...form, uploadedAt: new Date().toISOString().slice(0, 10) }); toast('Note added successfully', 'success') }
    else { updateNote(editing, form); toast('Note updated successfully', 'success') }
    setEditing(null)
  }
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div><h1>Notes</h1><p>Manage all uploaded notes.</p></div>
        <Button onClick={() => { setEditing('new'); setForm(blank) }}><Plus size={16} /> Add Note</Button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Subject</th><th>Author</th><th>Type</th><th>Downloads</th><th>Actions</th></tr></thead>
        <tbody>
          {notes.map(n => (
            <tr key={n.id}>
              <td style={{ fontWeight: 600, maxWidth: 300 }}>{n.title}</td>
              <td>{n.subject}</td><td>{n.author}</td><td>{n.fileType?.toUpperCase()}</td><td>{n.downloads}</td>
              <td><div style={{ display: 'flex', gap: 8 }}>
                <button className="icon-btn" onClick={() => { setEditing(n.id); setForm(n) }}><Pencil size={15} /></button>
                <button className="icon-btn" onClick={() => setConfirm(n)} style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add Note' : 'Edit Note'}
        footer={<><Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} />
        <Textarea label="Description" value={form.description} onChange={e => set('description', e.target.value)} />
        <Select label="Subject" value={form.subject} onChange={e => { const s = subjects.find(x => x.name === e.target.value); set('subject', e.target.value); set('subjectId', s?.id || '') }}>
          <option value="">Select subject</option>
          {subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </Select>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Select label="File Type" value={form.fileType} onChange={e => set('fileType', e.target.value)}>
            <option value="pdf">PDF</option><option value="doc">Document</option><option value="ppt">Presentation</option><option value="xls">Spreadsheet</option>
          </Select>
          <Input label="Size" value={form.size} onChange={e => set('size', e.target.value)} />
        </div>
        <Input label="Author" value={form.author} onChange={e => set('author', e.target.value)} />
      </Modal>

      <ConfirmDialog open={!!confirm} title="Delete Note" message={`Delete "${confirm?.title}"?`}
        onCancel={() => setConfirm(null)} onConfirm={() => { removeNote(confirm.id); toast('Note deleted successfully', 'success'); setConfirm(null) }} confirmText="Delete" />
    </>
  )
}