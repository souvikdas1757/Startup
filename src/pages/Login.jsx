import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Button from '../components/Button'
import { Input } from '../components/Input'
import { GraduationCap, ShieldCheck } from 'lucide-react'
import api from '../services/api'

export default function Login() {
  const { login } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [role, setRole] = useState('student')     // student | admin
  const [mode, setMode] = useState('login')        // login | register
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [branch, setBranch] = useState('Computer Science')
  const [semester, setSemester] = useState(3)
  const [section, setSection] = useState('A')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (mode === 'register') {
        // Call register endpoint
        await api.post('/auth/register', { name, email, password, branch, semester, section })
        toast('Account created! Logging you in...', 'success')
      }

      // Login (after registration or directly)
      const result = await login(email, password)
      if (result.success) {
        toast('Welcome to NEXORA!', 'success')
        if (result.role === 'ADMIN') navigate('/admin')
        else navigate('/dashboard')
      } else {
        toast(result.message || 'Login failed', 'error')
      }
    } catch (error) {
      toast(error.response?.data?.message || 'Something went wrong', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', padding: 20 }}>
      <div className="card" style={{ padding: 32, width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: 'var(--primary)', color: '#fff', borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 28, margin: '0 auto 12px' }}>📖</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px' }}>NEXORA</h1>
          <p style={{ color: 'var(--text-2)', marginTop: 4 }}>Share & Learn Together</p>
        </div>

        {/* Role Toggle */}
        <div className="tabs" style={{ justifyContent: 'center', borderBottom: 'none', background: 'var(--card-2)', padding: 4, borderRadius: 10 }}>
          <button type="button" className={`tab ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}
            style={{ borderBottom: 'none', borderRadius: 8, padding: '8px 16px', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <GraduationCap size={16} /> Student
          </button>
          <button type="button" className={`tab ${role === 'admin' ? 'active' : ''}`} onClick={() => { setRole('admin'); setMode('login') }}
            style={{ borderBottom: 'none', borderRadius: 8, padding: '8px 16px', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ShieldCheck size={16} /> Admin
          </button>
        </div>

        {/* Login / Register Header */}
        <div style={{ textAlign: 'center', color: 'var(--text-2)', fontSize: 13 }}>
          {mode === 'login' ? 'Sign in to your account' : 'Create your student account'}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <>
              <Input label="Full Name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="field">
                  <label>Semester</label>
                  <select value={semester} onChange={e => setSemester(+e.target.value)}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Section</label>
                  <select value={section} onChange={e => setSection(e.target.value)}>
                    {['A','B','C','D','E'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Branch</label>
                <select value={branch} onChange={e => setBranch(e.target.value)}>
                  {['Computer Science','Electronics','Mechanical','Civil'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </>
          )}

          <Input label="Email Address" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />

          <Button type="submit" disabled={submitting} style={{ marginTop: 8 }}>
            {submitting ? 'Please wait...' : mode === 'login' ? `Sign In as ${role === 'student' ? 'Student' : 'Admin'}` : 'Create Account'}
          </Button>
        </form>

        {/* Mode Toggle */}
        {role === 'student' && (
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-2)' }}>
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => setMode('register')}
                  style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign Up
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => setMode('login')}
                  style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign In
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}