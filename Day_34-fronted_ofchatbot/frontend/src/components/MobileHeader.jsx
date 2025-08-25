import React from 'react'
import ThemeToggle from './ThemeToggle'
import '../styles/MobileHeader.css'

const MobileHeader = ({ toggleSidebar, openNewChatModal }) => {
  return (
    <header className="mobile-header">
      <button className="menu-btn" onClick={toggleSidebar}>
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <h1 className="header-title">Chat</h1>
      <div className="header-actions">
        <ThemeToggle size="small" />
        <button className="new-chat-btn-header" onClick={openNewChatModal}>
          <span>+</span>
        </button>
      </div>
    </header>
  )
}

export default MobileHeader
