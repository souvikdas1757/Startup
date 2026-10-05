import { Link } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarkContext'
import { useData } from '../context/DataContext'
import NoteCard from '../components/NoteCard'
import ProblemCard from '../components/ProblemCard'
import DocCard from '../components/DocCard'
import EmptyState from '../components/EmptyState'
import { problemsSeed } from '../data/problems'

export default function Bookmarks() {
  const { bookmarks } = useBookmarks()
  const { notes, documentation } = useData()
  const bNotes = notes.filter(n => bookmarks.notes.includes(n.id))
  const bDocs = documentation.filter(d => bookmarks.docs.includes(d.id))
  const bProblems = problemsSeed.filter(p => bookmarks.problems.includes(p.id))

  return (
    <>
      <div className="page-header"><h1>Bookmarks</h1><p>Your saved content for quick access.</p></div>

      <div className="section-header"><h2>Saved Notes ({bNotes.length})</h2></div>
      {bNotes.length === 0 ? <EmptyState title="No bookmarked notes" /> : <div className="grid grid-3">{bNotes.map(n => <NoteCard key={n.id} note={n} />)}</div>}

      <div className="section-header"><h2>Saved Documentation ({bDocs.length})</h2></div>
      {bDocs.length === 0 ? <EmptyState title="No bookmarked docs" /> : <div className="grid grid-3">{bDocs.map(d => <DocCard key={d.id} doc={d} />)}</div>}

      <div className="section-header"><h2>Saved Problems ({bProblems.length})</h2></div>
      {bProblems.length === 0 ? <EmptyState title="No bookmarked problems" /> : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{bProblems.map(p => <ProblemCard key={p.id} problem={p} />)}</div>}
    </>
  )
}