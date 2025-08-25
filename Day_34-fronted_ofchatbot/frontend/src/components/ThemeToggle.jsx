import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = ({ className = '', size = 'medium', showLabel = false }) => {
  const { theme, toggleTheme, isSystem } = useTheme()

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-sm'
      case 'large':
        return 'w-12 h-12 text-xl'
      default:
        return 'w-10 h-10 text-lg'
    }
  }

  return (
    <button
      className={`theme-toggle ${getSizeClasses()} ${className}`}
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode${isSystem ? ' (following system)' : ''}`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
      {showLabel && (
        <span className="theme-label">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  )
}

export default ThemeToggle
