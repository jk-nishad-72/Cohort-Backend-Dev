import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'
import axios from 'axios'
import '../styles/theme.css'

const Login = () => {
  const { theme } = useTheme()
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setsubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigat = useNavigate();
   
  function update(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('') // Clear error when user types
  }

  async function submit(e) {
    e.preventDefault()
    setsubmitting(true)
    setError('')
    
    console.log('login', form)
    
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email: form.email,
        password: form.password
      }, {
        withCredentials: true
      })
      
      console.log(response)
      // Refresh the page to update sidebar with user info
      window.location.href = "/"
      
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setsubmitting(false)
    }
  }

  return (
    <div className="container">
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="form-title">Welcome back</h2>
            <div className="form-subtitle">Sign in to continue to your account.</div>
            <ThemeToggle size="small" className="theme-toggle-btn-auth" />
          </div>

          <form onSubmit={submit}>
            {error && (
              <div className="error-message" style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={update} required />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Your password" value={form.password} onChange={update} required />
            </div>

            <div className="actions">
              <button type="submit" className="btn full" disabled={submitting}>
                {submitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="muted">Don't have an account? <a className="link" href="/register">Create account</a></div>
        </div>
      </div>
    </div>
  )
}

export default Login
