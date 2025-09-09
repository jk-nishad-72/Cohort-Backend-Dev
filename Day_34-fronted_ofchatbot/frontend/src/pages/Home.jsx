import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import MobileHeader from '../components/MobileHeader'
import Sidebar from '../components/Sidebar'
import NewChatModal from '../components/NewChatModal'
import WelcomeScreen from '../components/WelcomeScreen'
import ChatInterface from '../components/ChatInterface'
import '../styles/Home.css'
import { io } from "socket.io-client";

const Home = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [input, setInput] = useState('')
  // Remove hardcoded chats - start with empty array
  const [previousChats, setPreviousChats] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [newChatTitle, setNewChatTitle] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
   const [socket, setSocket] = useState(null)

  const currentChat = previousChats.find((c) => c.id === activeChatId) || null
  const currentMessages = currentChat?.messages || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  
    const tempSocket = io('http://localhost:3001', {
      withCredentials: true
    })
  
    // 🔥 Listen for AI response
    tempSocket.on('ai-response', (messagePayload) => {
      // console.log("AI Response received:", messagePayload)
  
      const aiMsg = {
        id: messagePayload.chat,
        role: 'model',
        text: messagePayload.response, // 👈 backend se aaya content
        time: new Date().toLocaleTimeString()
      }
  
      setPreviousChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== activeChatId) return chat
          return {
            ...chat,
            messages: [...(chat.messages || []), aiMsg],
            last: aiMsg.text
          }
        })
      )
  
      setIsTyping(false) // stop typing indicator
    })
  
    setSocket(tempSocket)
  
    return () => {
      tempSocket.disconnect()
    }
  }, [activeChatId])
  


  // Create new chat in backend
  const createChatInBackend = async (title) => {
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:3001/api/chats', {
        title: title
      }, {
        withCredentials: true
      })
      
      const newChat = {
        id: response.data.chat._id,
        title: response.data.chat.title,
        last: '',
        messages: [],
        backendId: response.data.chat._id // Store backend ID for future reference
      }
      
      setPreviousChats(prev => [newChat, ...prev])
      setActiveChatId(newChat.id)
      return newChat
    } catch (error) {
      console.error('Error creating chat:', error)
      // Fallback to local chat creation if backend fails
      const fallbackChat = {
        id: Date.now(),
        title: title,
        last: '',
        messages: [],
        backendId: null
      }
      setPreviousChats(prev => [fallbackChat, ...prev])
      setActiveChatId(fallbackChat.id)
      return fallbackChat
    } finally {
      setLoading(false)
    }
  }


  const sendMessage = async (e) => {
    if (e) e.preventDefault()
    const text = input.trim()
    if (!text) return
  
    // If no active chat → create new one first
    if (!activeChatId) {
      const title = text.length > 20 ? text.slice(0, 20) + '...' : text
      await createChatInBackend(title)
    }
  
    // Emit user message to backend via socket
    socket.emit('ai-message', {
      chat: activeChatId,
      content: text
    })
  
    // Add user message locally
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString()
    }
  
    setInput('')
    setPreviousChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== (activeChatId || prev[0]?.id)) return chat
        return {
          ...chat,
          messages: [...(chat.messages || []), userMsg],
          last: userMsg.text
        }
      })
    )
  
    // Show typing indicator until AI response arrives
    setIsTyping(true)
  }
  


  // const generateAIResponse = async (userMessage) => {
    
  //   // This is a mock AI response generator
  //   // Replace this with actual API calls to your AI service
  //   const responses = [
  //     `I understand you're asking about "${userMessage}". That's an interesting topic!`,
  //     `Great question! "${userMessage}" is something I can help you with.`,
  //     `Regarding "${userMessage}", I'd be happy to provide some insights.`,
  //     `"${userMessage}" - that's a fascinating subject. Let me share what I know.`,
  //     `I appreciate you asking about "${userMessage}". Here's what I can tell you.`
  //   ]
    
  //   const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
  //   return {
  //     id: Date.now(),
  //     role: 'ai',
  //     text: randomResponse,
  //     time: new Date().toLocaleTimeString()
  //   }
  // }


  const loadPreviousChat = (chat) => {
    
    if (chat) {
      setActiveChatId(chat.id)
    }
    setSidebarOpen(false)
  }

  const openNewChatModal = () => {
    setShowNewChatModal(true)
    setNewChatTitle('')
  }

  const createNewChatWithTitle = async () => {
    const title = newChatTitle.trim()
    if (!title) return

    await createChatInBackend(title)
    setInput('')
    setSidebarOpen(false)
    setShowNewChatModal(false)
    setNewChatTitle('')
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const formatTime = (timeString) => {
    try {
      const time = new Date(`2000-01-01 ${timeString}`)
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch {
      return timeString
    }
  }

  return (
    <div className="home-container">
      
      <MobileHeader 
        toggleSidebar={toggleSidebar}
        openNewChatModal={openNewChatModal}
      />


      <Sidebar 
        sidebarOpen={sidebarOpen}
        previousChats={previousChats}
        activeChatId={activeChatId}
        loadPreviousChat={loadPreviousChat}
        openNewChatModal={openNewChatModal}
      />


      <NewChatModal 
        showNewChatModal={showNewChatModal}
        newChatTitle={newChatTitle}
        setNewChatTitle={setNewChatTitle}
        createNewChatWithTitle={createNewChatWithTitle}
        setShowNewChatModal={setShowNewChatModal}
        loading={loading}
      />

      {/* Main Chat Area */}
      <main className="chat-area">
        {currentMessages.length === 0 ? (
          <WelcomeScreen 
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            inputRef={inputRef}
          />
        ) : (
          <ChatInterface 
            currentChat={currentChat}
            currentMessages={currentMessages}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            inputRef={inputRef}
            messagesEndRef={messagesEndRef}
            isTyping={isTyping}
            formatTime={formatTime}
          />
        )}
      </main>
    </div>
  )
}

export default Home


