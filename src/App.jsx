import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import SubjectDetail from './pages/SubjectDetail'
import Notes from './pages/Notes'
import NoteDetail from './pages/NoteDetail'
import Assignments from './pages/Assignments'
import Announcements from './pages/Announcements'
import Coding from './pages/Coding'
import CodingCategory from './pages/CodingCategory'
import CodingPractice from './pages/CodingPractice'
import Documentation from './pages/Documentation'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import { useAuth } from './context/AuthContext'

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminSubjects from './pages/admin/AdminSubjects'
import AdminNotes from './pages/admin/AdminNotes'
import AdminAssignments from './pages/admin/AdminAssignments'
import AdminDocumentation from './pages/admin/AdminDocumentation'
import AdminAnnouncements from './pages/admin/AdminAnnouncements'
import AdminUsers from './pages/admin/AdminUsers'

// Route Guard for Student
function RequireStudent({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', color: 'var(--text)' }}>Loading NEXORA...</div>
  return user ? children : <Navigate to="/login" replace />
}

// Route Guard for Admin
function RequireAdmin({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', color: 'var(--text)' }}>Loading NEXORA...</div>
  return user && user.role === 'ADMIN' ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="subjects" element={<AdminSubjects />} />
        <Route path="notes" element={<AdminNotes />} />
        <Route path="assignments" element={<AdminAssignments />} />
        <Route path="documentation" element={<AdminDocumentation />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      <Route path="/" element={<RequireStudent><Layout /></RequireStudent>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="subjects/:id" element={<SubjectDetail />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:id" element={<NoteDetail />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="coding" element={<Coding />} />
        <Route path="coding/practice" element={<CodingPractice />} />
        <Route path="coding/:category" element={<CodingCategory />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="documentation/:slug" element={<Documentation />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}