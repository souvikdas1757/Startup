import { createContext, useContext, useEffect, useState } from 'react'
import { getData, setData } from '../utils/storage'
const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getData('nexora_theme', 'dark'))
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    setData('nexora_theme', theme)
  }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>{children}</ThemeContext.Provider>
}