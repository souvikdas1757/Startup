export default function Badge({ type = 'normal', children }) {
  return <span className={`badge ${type}`}>{children}</span>
}