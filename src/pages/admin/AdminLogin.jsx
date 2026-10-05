import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/Button'
import { Input } from '../../components/Input'

export default function AdminLogin() {
  const { adminLogin } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (adminLogin(email, password)) { toast('Welcome back, Admin', 'success'); navigate('/admin') }
    else toast('Invalid credentials', 'error')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', padding: 20 }}>
      <form onSubmit={submit} className="card" style={{ padding: 32, width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ width: 52, height: 52, background: 'var(--primary)', color: '#fff', borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 24, margin: '0 auto 12px' }}>📖</div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>NEXORA Admin</h1>
          <p style={{ color: 'var(--text-2)', marginTop: 4 }}>Sign in to manage the platform</p>
        </div>
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@nexora.io" required />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        <Button type="submit">Sign In</Button>
        <div style={{ fontSize: 11.5, color: 'var(--text-3)', textAlign: 'center', marginTop: 4 }}>
          Demo: souvikdas1757@gmail.com / isha1998
        </div>
      </form>
    </div>
  )
}