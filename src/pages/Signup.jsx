import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { validateSignup } from '../hooks/useValidation'

export default function Signup() {
  const { signup } = useAuthContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullname: '', email: '', password: '', confirmPassword: '', gender: '', mobile: '' })
  const [errors, setErrors] = useState({})
  const [serverErr, setServerErr] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const v = validateSignup(form)
    if (Object.keys(v).length) { setErrors(v); return }
    const res = signup({
      fullname: form.fullname,
      email: form.email,
      password: form.password,
      mobile: form.mobile,
      gender: form.gender,
    })
    if (!res.ok) { setServerErr(res.message || 'Error'); return }
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Sign up</h2>
      {serverErr && <div className="text-red-600 mb-2">{serverErr}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={form.fullname} onChange={e => setForm({ ...form, fullname: e.target.value })} className="w-full p-2 border rounded" placeholder="Fullname" />
        {errors.fullname && <div className="text-red-500 text-sm">{errors.fullname}</div>}

        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded" placeholder="Email" />
        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full p-2 border rounded" placeholder="Password" />
        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} className="w-full p-2 border rounded" placeholder="Confirm password" />
        {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}

        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="w-full p-2 border rounded">
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} className="w-full p-2 border rounded" placeholder="Mobile (optional)" />

        <button className="w-full py-2 bg-blue-600 text-white rounded">Create Account</button>
      </form>
    </div>
  )
}
