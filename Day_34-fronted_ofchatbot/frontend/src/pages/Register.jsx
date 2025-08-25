
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'
import axios from 'axios';
import '../styles/theme.css'

const Register = () => {
  const { theme } = useTheme()
  const [form, setForm] = useState({ email: '', first: '', last: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();

  function update(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('') // Clear error when user types
  }

  async function submit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    console.log('register', form)

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        email: form.email,
        fullname: {
          firstname: form.first,
          lastname: form.last
        },
        password: form.password
      }, {
        withCredentials: true
      })
      
      console.log(response)
      // Refresh the page to update sidebar with user info
      window.location.href = "/"
      
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container">
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="form-title">Create account</h2>
            <div className="form-subtitle">Join us and start exploring.</div>
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

            <div className="form-row">
              <div className="field">
                <label htmlFor="first">First name</label>
                <input id="first" name="first" type="text" placeholder="Jane" value={form.first} onChange={update} required />
              </div>

              <div className="field">
                <label htmlFor="last">Last name</label>
                <input id="last" name="last" type="text" placeholder="Doe" value={form.last} onChange={update} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Create a password" value={form.password} onChange={update} required />
            </div>

            <div className="actions">
              <button type="submit" className="btn full" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="muted">Already have an account? <a className="link" href="/login">Sign in</a></div>
        </div>
      </div>
    </div>
  )
}

export default Register

