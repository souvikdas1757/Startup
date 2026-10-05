import { FileText, Eye, Download, Bookmark } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { useBookmarks } from '../context/BookmarkContext'
import { useToast } from '../context/ToastContext'

export default function NoteCard({ note }) {
  const { isBookmarked, toggle } = useBookmarks()
  const { toast } = useToast()
  const navigate = useNavigate()
  const bookmarked = isBookmarked('notes', note.id)
  const onToggle = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggle('notes', note.id)
    toast(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', bookmarked ? 'info' : 'success')
  }
  const onDownload = (e) => {
    e.preventDefault(); e.stopPropagation()
    toast(`Downloading "${note.title}"`, 'success')
  }
  return (
    <div className="card note-card" onClick={() => navigate(`/notes/${note.id}`)} style={{ cursor: 'pointer' }}>
      <div className="head">
        <div className={`cover ${note.cover || 'red'}`}><FileText size={22} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <h3>{note.title}</h3>
            <span className="badge-tag">Section {note.section}</span>
          </div>
          <p className="desc">{note.description}</p>
        </div>
      </div>
      <div className="author-row">
        <Avatar name={note.author} />
        <span>{note.author}</span>
        <span>·</span>
        <span>{note.uploadedAt}</span>
      </div>
      <div className="stats">
        <div className="col"><b>{note.size}</b><span>Size</span></div>
        <div className="col"><b>{note.subject}</b><span>Subject</span></div>
        <div className="col"><b>{note.downloads}</b><span>downloads</span></div>
        <div className="actions">
          <button className="icon-btn" title="Bookmark" onClick={onToggle} style={{ color: bookmarked ? 'var(--primary)' : undefined }}><Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} /></button>
          <button className="icon-btn" title="View"><Eye size={16} /></button>
          <button className="icon-btn" title="Download" onClick={onDownload} style={{ color: '#fff', background: 'var(--primary)' }}><Download size={16} /></button>
        </div>
      </div>
    </div>
  )
}