import { CheckCircle, Circle, Bookmark } from 'lucide-react'
import Badge from './Badge'
import { useBookmarks } from '../context/BookmarkContext'
import { useToast } from '../context/ToastContext'
import { useState } from 'react'
import { getData, setData } from '../utils/storage'

export default function ProblemCard({ problem }) {
  const [solved, setSolved] = useState(() => (getData('nexora_solved', [])).includes(problem.id))
  const { isBookmarked, toggle } = useBookmarks()
  const { toast } = useToast()
  const bm = isBookmarked('problems', problem.id)

  const markSolved = () => {
    const list = getData('nexora_solved', [])
    const next = solved ? list.filter(x => x !== problem.id) : [...list, problem.id]
    setData('nexora_solved', next); setSolved(!solved)
    toast(solved ? 'Marked as unsolved' : 'Marked as solved', 'success')
  }
  const toggleBookmark = () => {
    toggle('problems', problem.id)
    toast(bm ? 'Removed from bookmarks' : 'Added to bookmarks', bm ? 'info' : 'success')
  }

  return (
    <div className="card problem-card">
      <button onClick={markSolved} className="icon-btn" style={{ color: solved ? 'var(--success)' : 'var(--text-3)' }}>
        {solved ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="title">{problem.title}</div>
        <div className="topics">{problem.topics.join(' · ')}</div>
      </div>
      <Badge type={problem.difficulty.toLowerCase()}>{problem.difficulty}</Badge>
      <button className="icon-btn" onClick={toggleBookmark} style={{ color: bm ? 'var(--primary)' : undefined }}>
        <Bookmark size={16} fill={bm ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}