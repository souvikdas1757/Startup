import { useState } from 'react'
import { problemsSeed } from '../data/problems'
import ProblemCard from '../components/ProblemCard'

const cats = ['All', 'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs', 'Sorting', 'Searching', 'Dynamic Programming']
const diffs = ['All', 'Easy', 'Medium', 'Hard']

export default function CodingPractice() {
  const [cat, setCat] = useState('All')
  const [diff, setDiff] = useState('All')
  const list = problemsSeed.filter(p => (cat === 'All' || p.category === cat) && (diff === 'All' || p.difficulty === diff))
  return (
    <>
      <div className="page-header"><h1>Coding Practice</h1><p>Solve problems, track your progress.</p></div>
      <div className="chips">{cats.map(c => <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="chips">{diffs.map(d => <button key={d} className={`chip ${diff === d ? 'active' : ''}`} onClick={() => setDiff(d)}>{d}</button>)}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{list.map(p => <ProblemCard key={p.id} problem={p} />)}</div>
    </>
  )
}