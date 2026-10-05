export const getData = (key, fallback = null) => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback }
  catch { return fallback }
}
export const setData = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}
export const removeData = (key) => {
  try { localStorage.removeItem(key) } catch {}
}