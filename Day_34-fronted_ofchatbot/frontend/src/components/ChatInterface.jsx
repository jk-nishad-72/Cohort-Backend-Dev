import React from 'react'
import '../styles/ChatInterface.css'

const ChatInterface = ({ 
  currentChat, 
  currentMessages, 
  input, 
  setInput, 
  sendMessage, 
  inputRef, 
  messagesEndRef, 
  isTyping, 
  formatTime 
}) => {

  




  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2 className="chat-title">{currentChat?.title}</h2>
        <span className="chat-message-count">{currentMessages.length} messages</span>
      </div>
      
      <div className="messages-container">
        {currentMessages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.time)}</div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="message ai typing">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Type your message..."
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
            disabled={!input.trim() || isTyping}
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

export default ChatInterface
