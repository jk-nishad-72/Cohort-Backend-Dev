import React from 'react'
import '../styles/WelcomeScreen.css'

const WelcomeScreen = ({ input, setInput, sendMessage, inputRef }) => {
  return (
    <div className="chat-content">
      <div className="early-preview-badge">
        Early Preview
      </div>
      
      <h1 className="main-title">ChatGPT Clone</h1>
      
      <p className="description">
        Ask anything. Paste text, brainstorm ideas, or get quick explanations. Your chats stay in the sidebar so you can pick up where you left off.
      </p>
      
      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Message ChatGPT..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
          />
          <button 
            className="send-button"
            onClick={sendMessage}
            type="button"
          >
            →
          </button>
        </div>
        <div className="input-instructions">
          Enter ↵ to send • Shift+Enter = newline
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
