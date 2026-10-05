import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bookmark, Download, Eye, FileText } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useBookmarks } from '../context/BookmarkContext'
import { useToast } from '../context/ToastContext'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import EmptyState from '../components/EmptyState'

export default function NoteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notes } = useData()
  const { isBookmarked, toggle } = useBookmarks()
  const { toast } = useToast()
  const note = notes.find(n => n.id === id)
  if (!note) return <EmptyState title="Note not found" />
  const bm = isBookmarked('notes', note.id)

  return (
    <>
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}><ArrowLeft size={14} /> Back</button>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div className={`cover ${note.cover || 'red'}`} style={{ width: 64, height: 76, borderRadius: 12, display: 'grid', placeItems: 'center', border: '1.5px solid', color: '#ef4444', borderColor: 'rgba(239,68,68,.4)', background: 'rgba(239,68,68,.08)' }}>
            <FileText size={30} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -.4 }}>{note.title}</h1>
            <p style={{ color: 'var(--text-2)', marginTop: 8, lineHeight: 1.7 }}>{note.description}</p>
            <div style={{ display: 'flex', gap: 18, marginTop: 16, flexWrap: 'wrap', color: 'var(--text-3)', fontSize: 13 }}>
              <span><b style={{ color: 'var(--text)' }}>{note.subject}</b></span>
              <span>Semester {note.semester}</span>
              <span>Section {note.section}</span>
              <span>{note.branch}</span>
              <span>Type: {note.fileType.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <Avatar name={note.author} />
          <div>
            <div style={{ fontWeight: 600 }}>{note.author}</div>
            <div style={{ color: 'var(--text-3)', fontSize: 12 }}>Uploaded {note.uploadedAt}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 24, color: 'var(--text-2)', fontSize: 13 }}>
            <span><b style={{ color: 'var(--text)' }}>{note.size}</b> size</span>
            <span><b style={{ color: 'var(--text)' }}>{note.downloads}</b> downloads</span>
            <span><b style={{ color: 'var(--text)' }}>{note.views}</b> views</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
          <Button onClick={() => toast('Opening PDF viewer…', 'info')}><Eye size={16} /> View PDF</Button>
          <Button variant="ghost" onClick={() => toast(`Downloading "${note.title}"`, 'success')}><Download size={16} /> Download</Button>
          <Button variant="ghost" onClick={() => { toggle('notes', note.id); toast(bm ? 'Removed from bookmarks' : 'Added to bookmarks', 'success') }}>
            <Bookmark size={16} fill={bm ? 'currentColor' : 'none'} /> {bm ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>
      </div>
    </>
  )
}