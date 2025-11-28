export const getLocal = (key) => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(key)
  try {
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const setLocal = (key, value) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocal = (key) => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}
