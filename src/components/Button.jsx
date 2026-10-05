export default function Button({ children, variant = 'primary', size, className = '', ...rest }) {
  return <button className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`} {...rest}>{children}</button>
}