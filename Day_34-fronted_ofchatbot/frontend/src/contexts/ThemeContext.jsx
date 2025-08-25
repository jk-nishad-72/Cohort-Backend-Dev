import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark') // Default to dark
  const [isSystem, setIsSystem] = useState(true)

  // Check system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      if (isSystem) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    // Set initial theme based on system preference
    if (isSystem) {
      setTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isSystem])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    if (isSystem) {
      setIsSystem(false)
      setTheme(theme === 'dark' ? 'light' : 'dark')
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  const setSystemTheme = () => {
    setIsSystem(true)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mediaQuery.matches ? 'dark' : 'light')
  }

  const value = {
    theme,
    isSystem,
    toggleTheme,
    setSystemTheme,
    setTheme: (newTheme) => {
      setIsSystem(false)
      setTheme(newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
