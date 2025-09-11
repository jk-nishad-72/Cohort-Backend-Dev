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

  // -------------------------------
  // SOCKET SETUP
  // -------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  
    const tempSocket = io('http://localhost:3001', {
      withCredentials: true
    })
  
    tempSocket.on('ai-response', (messagePayload) => {
      const aiMsg = {
        id: messagePayload.chat,
        role: 'model',
        text: messagePayload.response,
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
  
      setIsTyping(false)
    })
  
    setSocket(tempSocket)
  
    return () => {
      tempSocket.disconnect()
    }
  }, [activeChatId])
  

  // -------------------------------
  // STEP 1: FETCH CHATS AFTER LOGIN
  // -------------------------------
  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return

      try {
        const res = await axios.get("http://localhost:3001/api/chats", {
          withCredentials: true,
        })

        const chats = res.data.chats.map(c => ({
          id: c._id,
          title: c.title,
          last: c.last || c.lastActivity || "",
          messages: [],   // initially empty, will fetch later
          backendId: c._id,
        }))

        setPreviousChats(chats)

        if (chats.length > 0) {
          // load messages for the most recent chat
          loadPreviousChat(chats[0])
        }
      } catch (err) {
        console.error("Failed to fetch chats:", err)
      }
    }

    fetchChats()
  }, [user])


  // -------------------------------
  // STEP 2: LOAD MESSAGES OF A CHAT
  // -------------------------------
  const loadPreviousChat = async (chat) => {
    if (!chat) return

    setLoading(true)
    setActiveChatId(chat.id)
    setInput('')
    try {
      // If this chat was created locally without backend id, skip fetch
      const res = chat.backendId
        ? await axios.get(`http://localhost:3001/api/chats/messages/${chat.id}`, { withCredentials: true })
        : { data: { messages: [] } }

      // Normalize messages shape: { id, role, text, time }
      const messages = (res.data.messages || []).map((m) => ({
        id: m.id || m._id,
        role: m.role || m.role,
        text: m.text || m.content || '',
        time: m.time || (m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : '')
      }))

      setPreviousChats((prev) =>
        prev.map((c) => (c.id === chat.id ? { ...c, messages } : c))
      )

      // Give React a beat to render then scroll to bottom
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    } finally {
      setLoading(false)
      setSidebarOpen(false)
      setIsTyping(false)
    }
  }



  // -------------------------------
  // CREATE NEW CHAT
  // -------------------------------
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
        backendId: response.data.chat._id
      }
      
      setPreviousChats(prev => [newChat, ...prev])
      setActiveChatId(newChat.id)
      return newChat
    } catch (error) {
      console.error('Error creating chat:', error)
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


  // -------------------------------
  // SEND MESSAGE
  // -------------------------------
  const sendMessage = async (e) => {
    if (e) e.preventDefault()
    const text = input.trim()
    if (!text) return
  
    if (!activeChatId) {
      const title = text.length > 20 ? text.slice(0, 20) + '...' : text
      await createChatInBackend(title)
    }
  
    socket.emit('ai-message', {
      chat: activeChatId,
      content: text
    })
  
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
  
    setIsTyping(true)
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
