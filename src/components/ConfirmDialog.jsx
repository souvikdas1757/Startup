import Modal from './Modal'
import Button from './Button'
export default function ConfirmDialog({ open, title = 'Are you sure?', message, onCancel, onConfirm, confirmText = 'Confirm' }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}
      footer={<><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button variant="danger" onClick={onConfirm}>{confirmText}</Button></>}>
      <p style={{ color: 'var(--text-2)' }}>{message}</p>
    </Modal>
  )
}