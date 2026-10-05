import Badge from './Badge'
export default function AnnouncementCard({ a }) {
  return (
    <div className={`card announcement-card ${a.type}`}>
      <div className="marker" />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>{a.title}</h3>
          <Badge type={a.type}>{a.type}</Badge>
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: 13, margin: '6px 0 10px', lineHeight: 1.6 }}>{a.body}</p>
        <div style={{ color: 'var(--text-3)', fontSize: 12 }}>{a.author} · {a.date}</div>
      </div>
    </div>
  )
}