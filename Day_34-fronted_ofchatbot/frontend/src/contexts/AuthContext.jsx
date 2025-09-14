import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/me', {
        withCredentials: true
      })
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      }, {
        withCredentials: true
      })
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (email, firstname, lastname, password) =>{
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        email,
        fullname: {
          firstname,
          lastname
        },
        password
      }, {
        withCredentials: true
      })
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, {
        withCredentials: true
      })
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
