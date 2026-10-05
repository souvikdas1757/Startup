import { Link } from 'react-router-dom'
import { Code2, Coffee, Cpu, Braces, Terminal, Atom, Database, Globe, Server, BookOpen } from 'lucide-react'

const cats = [
  { name: 'DSA', icon: Cpu, desc: 'Data Structures & Algorithms' },
  { name: 'Java', icon: Coffee, desc: 'Object-oriented Java' },
  { name: 'C', icon: Terminal, desc: 'Procedural C programming' },
  { name: 'C++', icon: Braces, desc: 'C++ and STL' },
  { name: 'Python', icon: Code2, desc: 'Pythonic programming' },
  { name: 'JavaScript', icon: Atom, desc: 'Modern JS & ES6+' },
  { name: 'React', icon: Atom, desc: 'React.js frontend' },
  { name: 'SQL', icon: Database, desc: 'Databases & queries' },
  { name: 'Web Development', icon: Globe, desc: 'HTML, CSS, Web' },
  { name: 'Backend', icon: Server, desc: 'APIs and servers' },
  { name: 'Computer Science', icon: BookOpen, desc: 'Core CS concepts' },
]

export default function Coding() {
  return (
    <>
      <div className="page-header"><h1>CodeHub</h1><p>Explore categories, learn topics, and practice problems.</p></div>
      <div className="chips">
        <Link to="/coding/practice" className="chip active">🎯 Practice Problems</Link>
      </div>
      <div className="grid grid-3">
        {cats.map(c => (
          <Link key={c.name} to={`/coding/${encodeURIComponent(c.name)}`} className="card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 46, height: 46, borderRadius: 11, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}><c.icon size={22} /></div>
            <div>
              <div style={{ fontWeight: 700 }}>{c.name}</div>
              <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}