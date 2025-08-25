import React, { useRef, useEffect } from 'react'
import '../styles/NewChatModal.css'

const NewChatModal = ({ 
  showNewChatModal, 
  newChatTitle, 
  setNewChatTitle, 
  createNewChatWithTitle, 
  setShowNewChatModal,
  loading = false
}) => {
  const newChatTitleRef = useRef(null)

  // Focus on new chat title input when modal opens
  useEffect(() => {
    if (showNewChatModal && newChatTitleRef.current) {
      setTimeout(() => newChatTitleRef.current.focus(), 100)
    }
  }, [showNewChatModal])

  const handleNewChatKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault()
      createNewChatWithTitle()
    } else if (e.key === 'Escape') {
      setShowNewChatModal(false)
      setNewChatTitle('')
    }
  }

  if (!showNewChatModal) return null

  return (
    <div className="modal-overlay" onClick={() => !loading && setShowNewChatModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Create New Chat</h3>
        <p className="modal-subtitle">Give your chat a meaningful title</p>
        
        <div className="modal-input-group">
          <input
            ref={newChatTitleRef}
            type="text"
            className="modal-input"
            placeholder="Enter chat title..."
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyDown={handleNewChatKeyDown}
            maxLength={50}
            disabled={loading}
          />
          <div className="modal-input-info">
            {newChatTitle.length}/50 characters
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="modal-btn modal-btn-secondary" 
            onClick={() => setShowNewChatModal(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="modal-btn modal-btn-primary" 
            onClick={createNewChatWithTitle}
            disabled={!newChatTitle.trim() || loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating...
              </>
            ) : (
              'Create Chat'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewChatModal
