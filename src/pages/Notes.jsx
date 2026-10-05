import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import NoteCard from '../components/NoteCard'
import EmptyState from '../components/EmptyState'

const sorts = ['Recent', 'Popular', 'Most Downloaded']

export default function Notes() {
  const { notes, subjects } = useData()
  const [params] = useSearchParams()
  const [filter, setFilter] = useState('Recent')
  const [subject, setSubject] = useState('All')
  const [semester, setSemester] = useState('All')
  const [branch, setBranch] = useState('All')
  const [section, setSection] = useState('All')
  const [fileType, setFileType] = useState('All')

  useEffect(() => {
    const f = params.get('filter')
    const t = params.get('type')
    if (f === 'recent') setFilter('Recent')
    if (f === 'popular') setFilter('Most Downloaded')
    if (t) setFileType(t)
  }, [params])

  const list = useMemo(() => {
    let l = notes.slice()
    if (subject !== 'All') l = l.filter(n => n.subject === subject)
    if (semester !== 'All') l = l.filter(n => n.semester === +semester)
    if (branch !== 'All') l = l.filter(n => n.branch === branch)
    if (section !== 'All') l = l.filter(n => n.section === section)
    if (fileType !== 'All') l = l.filter(n => n.fileType === fileType)
    if (filter === 'Recent') l.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
    if (filter === 'Popular') l.sort((a, b) => b.views - a.views)
    if (filter === 'Most Downloaded') l.sort((a, b) => b.downloads - a.downloads)
    return l
  }, [notes, filter, subject, semester, branch, section, fileType])

  return (
    <>
      <div className="page-header">
        <h1>Section A Notes</h1>
        <p>{list.length} notes available</p>
      </div>

      <div className="chips">
        {sorts.map(s => <button key={s} className={`chip ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>)}
      </div>

      <div className="chips">
        <select className="chip" value={subject} onChange={e => setSubject(e.target.value)}>
          <option value="All">All Subjects</option>
          {subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        <select className="chip" value={semester} onChange={e => setSemester(e.target.value)}>
          <option value="All">All Semesters</option>{[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}
        </select>
        <select className="chip" value={branch} onChange={e => setBranch(e.target.value)}>
          <option value="All">All Branches</option>
          {['Computer Science', 'Electronics', 'Mechanical'].map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="chip" value={section} onChange={e => setSection(e.target.value)}>
          <option value="All">All Sections</option>{['A','B','C','D','E'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="chip" value={fileType} onChange={e => setFileType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="pdf">PDF</option><option value="doc">Document</option>
          <option value="ppt">Presentation</option><option value="xls">Spreadsheet</option>
        </select>
      </div>

      {list.length === 0 ? <EmptyState title="No notes match your filters" /> :
        <div className="grid grid-3">{list.map(n => <NoteCard key={n.id} note={n} />)}</div>}
    </>
  )
}