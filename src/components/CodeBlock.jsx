import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../context/ToastContext'

export default function CodeBlock({ language = 'java', code }) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const lines = code.split('\n')
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true); toast('Code copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 1800)
    })
  }
  return (
    <div className="codeblock">
      <div className="codeblock-header">
        <span className="lang">{language}</span>
        <button onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre>{lines.map((l, i) => (
        <div key={i}><span className="ln">{i + 1}</span>{l || ' '}</div>
      ))}</pre>
    </div>
  )
}