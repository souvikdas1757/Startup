export function Input({ label, ...rest }) {
  return <div className="field">{label && <label>{label}</label>}<input {...rest} /></div>
}
export function Textarea({ label, ...rest }) {
  return <div className="field">{label && <label>{label}</label>}<textarea {...rest} /></div>
}
export function Select({ label, children, ...rest }) {
  return <div className="field">{label && <label>{label}</label>}<select {...rest}>{children}</select></div>
}