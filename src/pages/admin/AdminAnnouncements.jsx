import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Input, Select, Textarea } from '../../components/Input'

const blank = { title: '', body: '', type: 'normal', author: 'Admin', date: new Date().toISOString().slice(0, 10) }

export default function AdminAnnouncements() {
  const { announcements, addAnnouncement, updateAnnouncement, removeAnnouncement } = useData()
  const { toast } = useToast()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [confirm, setConfirm] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const save = () => {
    if (!form.title || !form.body) { toast('Title and body required', 'error'); return }
    if (editing === 'new') { addAnnouncement(form); toast('Announcement created', 'success') }
    else { updateAnnouncement(editing, form); toast('Announcement updated', 'success') }
    setEditing(null)
  }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div><h1>Announcements</h1><p>Publish important updates to students.</p></div>
        <Button onClick={() => { setEditing('new'); setForm(blank) }}><Plus size={16} /> New Announcement</Button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Type</th><th>Author</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>{announcements.map(a => (
          <tr key={a.id}>
            <td style={{ fontWeight: 600 }}>{a.title}</td>
            <td><span className={`badge ${a.type}`}>{a.type}</span></td>
            <td>{a.author}</td><td>{a.date}</td>
            <td><div style={{ display: 'flex', gap: 8 }}>
              <button className="icon-btn" onClick={() => { setEditing(a.id); setForm(a) }}><Pencil size={15} /></button>
              <button className="icon-btn" onClick={() => setConfirm(a)} style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
            </div></td>
          </tr>))}</tbody>
      </table>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'New Announcement' : 'Edit Announcement'}
        footer={<><Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} />
        <Textarea label="Body" value={form.body} onChange={e => set('body', e.target.value)} />
        <Select label="Type" value={form.type} onChange={e => set('type', e.target.value)}>
          <option value="normal">Normal</option><option value="important">Important</option><option value="urgent">Urgent</option>
        </Select>
        <Input label="Author" value={form.author} onChange={e => set('author', e.target.value)} />
      </Modal>

      <ConfirmDialog open={!!confirm} title="Delete Announcement" message={`Delete "${confirm?.title}"?`}
        onCancel={() => setConfirm(null)} onConfirm={() => { removeAnnouncement(confirm.id); toast('Announcement deleted', 'success'); setConfirm(null) }} confirmText="Delete" />
    </>
  )
}