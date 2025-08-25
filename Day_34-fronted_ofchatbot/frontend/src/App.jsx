
import React from 'react'
import './styles/theme.css'
import AppRouter from './AppRouter'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div>
          <AppRouter />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App