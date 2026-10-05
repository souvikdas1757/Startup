import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'
const ToastContext = createContext()
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200)
  }, [])
  const icons = { success: CheckCircle, error: XCircle, info: Info, warn: AlertTriangle }
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => {
          const Icon = icons[t.type] || Info
          return <div key={t.id} className={`toast toast-${t.type}`}><Icon size={18} /><span>{t.message}</span></div>
        })}
      </div>
    </ToastContext.Provider>
  )
}