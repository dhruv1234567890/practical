import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setErr('Both fields required'); return }
    const res = login(email, password)
    if (!res.ok) { setErr(res.message || 'Invalid'); return }
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Password" />
        <button className="w-full py-2 bg-green-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
