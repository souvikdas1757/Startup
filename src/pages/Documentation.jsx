import { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useData } from '../context/DataContext'
import CodeBlock from '../components/CodeBlock'
import { useDebounce } from '../utils/useDebounce'

export default function Documentation() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { documentation } = useData()
  const [q, setQ] = useState('')
  const dq = useDebounce(q)

  const current = useMemo(() => documentation.find(d => d.slug === slug) || documentation[0], [documentation, slug])
  const searchResults = useMemo(() => {
    if (!dq.trim()) return null
    const s = dq.toLowerCase()
    return documentation.filter(d => d.title.toLowerCase().includes(s) || (d.content.intro || '').toLowerCase().includes(s))
  }, [dq, documentation])

  if (!current) return <div className="empty-state"><h3>No documentation yet.</h3></div>

  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <div className="navbar-search" style={{ margin: '0 0 12px 0', maxWidth: 'none' }}>
          <Search size={14} style={{ color: 'var(--text-3)' }} />
          <input placeholder="Search docs..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {searchResults ? (
          <>
            <h4>Results</h4>
            {searchResults.length === 0 && <div style={{ padding: 10, color: 'var(--text-3)', fontSize: 13 }}>No matches.</div>}
            {searchResults.map(d => (
              <Link key={d.id} to={`/documentation/${d.slug}`} className={d.slug === current.slug ? 'active' : ''}>{d.title}</Link>
            ))}
          </>
        ) : (
          <>
            <h4>Java</h4>
            {documentation.filter(d => d.category === 'Java').map(d => (
              <Link key={d.id} to={`/documentation/${d.slug}`} className={d.slug === current.slug ? 'active' : ''}>{d.title.replace('Java ', '')}</Link>
            ))}
            <h4 style={{ marginTop: 12 }}>Other Languages</h4>
            {documentation.filter(d => d.category !== 'Java').map(d => (
              <Link key={d.id} to={`/documentation/${d.slug}`} className={d.slug === current.slug ? 'active' : ''}>{d.title}</Link>
            ))}
          </>
        )}
      </aside>

      <article className="docs-content">
        <h1>{current.title}</h1>
        <span className="badge-tag" style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{current.category}</span>

        <h2>Introduction</h2>
        <p>{current.content.intro}</p>

        <h2>Syntax</h2>
        <CodeBlock language={current.language} code={current.content.syntax} />

        <h2>Example</h2>
        <CodeBlock language={current.language} code={current.content.example} />

        <h2>Output</h2>
        <CodeBlock language="text" code={current.content.output} />

        <h2>Explanation</h2>
        <p>{current.content.explanation}</p>

        <h2>Practice Problems</h2>
        <ul>{current.content.practice.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </article>
    </div>
  )
}