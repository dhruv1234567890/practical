import React, { createContext, useContext, useEffect, useState } from 'react'
import { getLocal, setLocal, removeLocal } from '../utils/storage'

const STORAGE_KEY = 'practical_users'
const STORAGE_LOGGED = 'practical_logged_user'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getLocal(STORAGE_LOGGED))

  useEffect(() => {
    setUser(getLocal(STORAGE_LOGGED))
  }, [])

  const signup = (u) => {
    const users = getLocal(STORAGE_KEY) || []
    if (users.some(x => x.email === u.email)) {
      return { ok: false, message: 'Email already registered' }
    }
    const newUsers = [...users, u]
    setLocal(STORAGE_KEY, newUsers)
    setLocal(STORAGE_LOGGED, u)
    setUser(u)
    return { ok: true }
  }

  const login = (email, password) => {
    const users = getLocal(STORAGE_KEY) || []
    const found = users.find(x => x.email === email && x.password === password)
    if (!found) return { ok: false, message: 'Invalid credentials' }
    setLocal(STORAGE_LOGGED, found)
    setUser(found)
    return { ok: true }
  }

  const logout = () => {
    removeLocal(STORAGE_LOGGED)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
