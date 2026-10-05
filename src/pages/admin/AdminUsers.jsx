import { usersSeed } from '../../data/users'
export default function AdminUsers() {
  return (
    <>
      <div className="page-header"><h1>Users</h1><p>All students and teachers registered on the platform.</p></div>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Branch</th><th>Semester</th><th>Section</th><th>Status</th></tr></thead>
        <tbody>{usersSeed.map(u => (
          <tr key={u.id}>
            <td style={{ fontWeight: 600 }}>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td><td>{u.branch}</td><td>{u.semester}</td><td>{u.section}</td>
            <td><span className={`badge ${u.status === 'active' ? 'easy' : 'hard'}`}>{u.status}</span></td>
          </tr>))}</tbody>
      </table>
    </>
  )
}