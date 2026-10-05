export default function Avatar({ name = '', size = '', className = '' }) {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
  return <div className={`avatar ${size} ${className}`}>{initials}</div>
}