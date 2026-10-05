import { useParams, Link } from 'react-router-dom'
import { problemsSeed } from '../data/problems'
import ProblemCard from '../components/ProblemCard'
import EmptyState from '../components/EmptyState'

export default function CodingCategory() {
  const { category } = useParams()
  const cat = decodeURIComponent(category)
  const list = problemsSeed.filter(p => p.category === cat || p.topics.includes(cat))
  return (
    <>
      <div className="page-header"><h1>{cat}</h1><p>{list.length} problems in this category.</p></div>
      <div style={{ marginBottom: 16 }}><Link to="/coding" className="link">← Back to CodeHub</Link></div>
      {list.length === 0 ? <EmptyState title="No problems yet" /> :
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{list.map(p => <ProblemCard key={p.id} problem={p} />)}</div>}
    </>
  )
}