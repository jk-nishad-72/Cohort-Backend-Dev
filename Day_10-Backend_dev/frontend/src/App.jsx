import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Facexpressn from './components/Facexpressn'
import MoodSongs  from './components/MoodSong'




function App() {

  
    const [ Songs, setSongs ] = useState([
        
    ])



  return (
    <>
     <Facexpressn setSongs={setSongs} />
     <MoodSongs Songs={Songs} />
    </>
  )
}

export default App
