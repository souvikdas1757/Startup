import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { Input, Select, Textarea } from './Input'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function UploadModal({ open, onClose }) {
  const { subjects, addNote } = useData()
  const { toast } = useToast()
  const { user } = useAuth()
  const [form, setForm] = useState({ title: '', description: '', subject: '', semester: 3, section: 'A', fileType: 'pdf', size: '1.0 MB' })
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleUpload = () => {
    if (!form.title || !form.subject) { toast('Please fill title and subject', 'error'); return }
    setUploading(true)
    let p = 0
    const t = setInterval(() => {
      p += 12 + Math.random() * 12
      if (p >= 100) {
        clearInterval(t); setProgress(100)
        addNote({
          ...form, author: user.name, branch: user.branch,
          subjectId: subjects.find(s => s.name === form.subject)?.id || 'misc',
          downloads: 0, views: 0, uploadedAt: new Date().toISOString().slice(0, 10), cover: 'red'
        })
        toast('Note uploaded successfully', 'success')
        setUploading(false); setProgress(0); onClose()
        setForm({ title: '', description: '', subject: '', semester: 3, section: 'A', fileType: 'pdf', size: '1.0 MB' })
      } else setProgress(p)
    }, 120)
  }

  return (
    <Modal open={open} onClose={onClose} title="Upload Notes"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleUpload} disabled={uploading}>{uploading ? `Uploading ${Math.floor(progress)}%` : 'Upload'}</Button></>}>
      <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Data Structures — Trees" />
      <Textarea label="Description" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short summary..." />
      <Select label="Subject" value={form.subject} onChange={e => set('subject', e.target.value)}>
        <option value="">Select subject</option>
        {subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
      </Select>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <Select label="Semester" value={form.semester} onChange={e => set('semester', +e.target.value)}>
          {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}
        </Select>
        <Select label="Section" value={form.section} onChange={e => set('section', e.target.value)}>
          {['A','B','C','D','E'].map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select label="File Type" value={form.fileType} onChange={e => set('fileType', e.target.value)}>
          <option value="pdf">PDF</option><option value="doc">Document</option>
          <option value="ppt">Presentation</option><option value="xls">Spreadsheet</option>
        </Select>
      </div>
      <Input label="File (simulated)" type="file" onChange={e => { if (e.target.files[0]) set('size', (e.target.files[0].size / 1e6).toFixed(1) + ' MB') }} />
      {uploading && <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', transition: 'width .15s' }} />
      </div>}
    </Modal>
  )
}