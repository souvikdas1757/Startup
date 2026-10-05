import { useState, useMemo } from 'react'
import { Menu, Search, Sun, Moon, Bell, LayoutGrid } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { useDebounce } from '../utils/useDebounce'

export default function Navbar({ onToggleSidebar, onToggleMobile }) {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const { subjects, notes, assignments, documentation } = useData()
  const [q, setQ] = useState('')
  const [showResults, setShowResults] = useState(false)
  const dq = useDebounce(q, 250)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!dq.trim()) return null
    const s = dq.toLowerCase()
    return {
      notes: notes.filter(n => n.title.toLowerCase().includes(s) || n.description.toLowerCase().includes(s)).slice(0, 5),
      subjects: subjects.filter(x => x.name.toLowerCase().includes(s) || x.code.toLowerCase().includes(s)).slice(0, 4),
      assignments: assignments.filter(a => a.title.toLowerCase().includes(s)).slice(0, 4),
      documentation: documentation.filter(d => d.title.toLowerCase().includes(s)).slice(0, 4),
    }
  }, [dq, notes, subjects, assignments, documentation])

  const go = (path) => { setQ(''); setShowResults(false); navigate(path) }

  return (
    <header className="navbar">
      <button className="icon-btn hamburger" onClick={onToggleMobile}><Menu size={20} /></button>
      <button className="icon-btn hide-sm" onClick={onToggleSidebar}><LayoutGrid size={18} /></button>
      
      <div className="viewing hide-sm">
        <span>Viewing:</span>
        <span className="tag">Section A</span>
      </div>

      {/* Search Bar */}
      <div className="navbar-search-wrap">
        <div className="navbar-search">
          <Search size={16} style={{ color: 'var(--text-3)' }} />
          <input
            value={q}
            onChange={e => { setQ(e.target.value); setShowResults(true) }}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 180)}
            placeholder="Search notes, subjects, documentation..."
          />
        </div>
        {showResults && results && (results.notes.length || results.subjects.length || results.assignments.length || results.documentation.length > 0) && (
          <div className="search-results">
            {results.notes.length > 0 && <><div className="group-title">Notes</div>
              {results.notes.map(n => <div key={n.id} className="result" onMouseDown={() => go(`/notes/${n.id}`)}><Search size={14} /><div><div>{n.title}</div><div className="sub">{n.subject}</div></div></div>)}</>}
            {results.subjects.length > 0 && <><div className="group-title">Subjects</div>
              {results.subjects.map(s => <div key={s.id} className="result" onMouseDown={() => go(`/subjects/${s.id}`)}><Search size={14} /><div><div>{s.name}</div><div className="sub">{s.code}</div></div></div>)}</>}
            {results.assignments.length > 0 && <><div className="group-title">Assignments</div>
              {results.assignments.map(a => <div key={a.id} className="result" onMouseDown={() => go(`/assignments`)}><Search size={14} /><div><div>{a.title}</div><div className="sub">{a.subject}</div></div></div>)}</>}
            {results.documentation.length > 0 && <><div className="group-title">Documentation</div>
              {results.documentation.map(d => <div key={d.id} className="result" onMouseDown={() => go(`/documentation/${d.slug}`)}><Search size={14} /><div><div>{d.title}</div><div className="sub">{d.category}</div></div></div>)}</>}
          </div>
        )}
      </div>

      <div className="spacer" />
      
      {/* Right Side Icons (Notice there is no Upload button anymore) */}
      <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button className="icon-btn" title="Notifications"><Bell size={18} /></button>
      <Avatar name={user.name} />
    </header>
  )
}