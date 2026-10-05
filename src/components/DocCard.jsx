import { FileCode } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function DocCard({ doc }) {
  return (
    <Link to={`/documentation/${doc.slug}`} className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>
        <FileCode size={20} />
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>{doc.title}</div>
        <div style={{ color: 'var(--text-3)', fontSize: 12.5, marginTop: 2 }}>{doc.category} · {doc.language}</div>
      </div>
    </Link>
  )
}