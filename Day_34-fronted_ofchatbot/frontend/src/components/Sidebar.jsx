import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/Sidebar.css'

const Sidebar = ({ 
  sidebarOpen, 
  previousChats, 
  activeChatId, 
  loadPreviousChat, 
  openNewChatModal 
}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check authentication status on component mount
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

  const handleSignIn = () => {
    navigate('/login')
  }

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, {
        withCredentials: true
      })
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
      navigate('/login')
    }
  }

  const getUserDisplayName = () => {
    if (user?.fullname?.firstname && user?.fullname?.lastname) {
      return `${user.fullname.firstname} ${user.fullname.lastname}`
    }
    return user?.email || 'User'
  }

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Chats</h2>
          <button className="new-chat-btn" onClick={openNewChatModal}>NEW</button>
        </div>
        
        {/* Chat List - Show empty state if no chats */}
        {previousChats.length === 0 ? (
          <div className="empty-chats-state">
            <div className="empty-chats-icon">💬</div>
            <h3 className="empty-chats-title">No chats yet</h3>
            <p className="empty-chats-description">
              Start your first conversation by typing a message or creating a new chat.
            </p>
            <button className="create-first-chat-btn" onClick={openNewChatModal}>
              Create Your First Chat
            </button>
          </div>
        ) : (
          <ul className="chats-list">
            {previousChats.map((chat) => (
              <li 
                key={chat.id} 
                className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`} 
                onClick={() => loadPreviousChat(chat)}
              >
                <span className="chat-title">{chat.title}</span>
                {chat.last && (
                  <span className="chat-preview">{chat.last}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        
        {/* User Info or Sign In Button at bottom */}
        <div className="sidebar-footer">
          {!loading && user ? (
            <div className="user-info">
              <div className="user-name">{getUserDisplayName()}</div>
              <div className="user-email">{user.email}</div>
              <button className="logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="sign-in-btn" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </div>
      </aside>
      
      {/* Overlay when sidebar is open */}
      {sidebarOpen && <div className="overlay" onClick={() => loadPreviousChat(null)} />}
    </>
  )
}

export default Sidebar
