import { X } from 'lucide-react'
export default function Modal({ open, onClose, title, children, footer, maxWidth }) {
  if (!open) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={maxWidth ? { maxWidth } : undefined} onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}