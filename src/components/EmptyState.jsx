import { Inbox } from 'lucide-react'
export default function EmptyState({ title = 'Nothing here', subtitle, icon: Icon = Inbox }) {
  return <div className="empty-state"><Icon size={40} /><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
}