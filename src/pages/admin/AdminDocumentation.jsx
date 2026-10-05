import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Input, Select, Textarea } from '../../components/Input'

const blankContent = { intro: '', syntax: '', example: '', output: '', explanation: '', practice: [] }
const blank = { title: '', slug: '', category: 'Java', language: 'java', content: blankContent }

export default function AdminDocumentation() {
  const { documentation, addDoc, updateDoc, removeDoc } = useData()
  const { toast } = useToast()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [confirm, setConfirm] = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setContent = (k, v) => setForm(f => ({ ...f, content: { ...f.content, [k]: v } }))

  const save = () => {
    if (!form.title) { toast('Title required', 'error'); return }
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-')
    const payload = { ...form, slug }
    if (editing === 'new') { addDoc(payload); toast('Documentation added', 'success') }
    else { updateDoc(editing, payload); toast('Documentation updated', 'success') }
    setEditing(null)
  }

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div><h1>Documentation</h1><p>Manage coding docs and code examples.</p></div>
        <Button onClick={() => { setEditing('new'); setForm(blank) }}><Plus size={16} /> Add Doc</Button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Language</th><th>Slug</th><th>Actions</th></tr></thead>
        <tbody>{documentation.map(d => (
          <tr key={d.id}>
            <td style={{ fontWeight: 600 }}>{d.title}</td><td>{d.category}</td><td>{d.language}</td><td>{d.slug}</td>
            <td><div style={{ display: 'flex', gap: 8 }}>
              <button className="icon-btn" onClick={() => { setEditing(d.id); setForm(d) }}><Pencil size={15} /></button>
              <button className="icon-btn" onClick={() => setConfirm(d)} style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
            </div></td>
          </tr>))}</tbody>
      </table>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add Documentation' : 'Edit Documentation'} maxWidth={620}
        footer={<><Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input label="Slug" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="auto from title" />
          <Select label="Category" value={form.category} onChange={e => set('category', e.target.value)}>
            {['Java','C','C++','Python','JavaScript','React','SQL'].map(c => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <Select label="Language" value={form.language} onChange={e => set('language', e.target.value)}>
          {['java','c','cpp','python','javascript','text'].map(l => <option key={l}>{l}</option>)}
        </Select>
        <Textarea label="Introduction" value={form.content.intro} onChange={e => setContent('intro', e.target.value)} />
        <Textarea label="Syntax" value={form.content.syntax} onChange={e => setContent('syntax', e.target.value)} />
        <Textarea label="Example" value={form.content.example} onChange={e => setContent('example', e.target.value)} />
        <Textarea label="Output" value={form.content.output} onChange={e => setContent('output', e.target.value)} />
        <Textarea label="Explanation" value={form.content.explanation} onChange={e => setContent('explanation', e.target.value)} />
      </Modal>

      <ConfirmDialog open={!!confirm} title="Delete Documentation" message={`Delete "${confirm?.title}"?`}
        onCancel={() => setConfirm(null)} onConfirm={() => { removeDoc(confirm.id); toast('Documentation deleted', 'success'); setConfirm(null) }} confirmText="Delete" />
    </>
  )
}