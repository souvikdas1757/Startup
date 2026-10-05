import { createContext, useContext, useState, useEffect } from 'react'
import { getData, setData } from '../utils/storage'
const BookmarkContext = createContext()
export const useBookmarks = () => useContext(BookmarkContext)

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => getData('nexora_bookmarks', { notes: [], docs: [], problems: [] }))
  useEffect(() => setData('nexora_bookmarks', bookmarks), [bookmarks])
  const toggle = (type, id) => setBookmarks(b => {
    const list = b[type] || []
    return { ...b, [type]: list.includes(id) ? list.filter(x => x !== id) : [...list, id] }
  })
  const isBookmarked = (type, id) => (bookmarks[type] || []).includes(id)
  return <BookmarkContext.Provider value={{ bookmarks, toggle, isBookmarked }}>{children}</BookmarkContext.Provider>
}