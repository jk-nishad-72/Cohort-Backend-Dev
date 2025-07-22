import { useState } from 'react'
import MoodSong from './components/MoodSong'
import './App.css'
import FacialExpressin  from './components/FacialExpressin'

function App() {
 

  return (
    <>
       
       <div className='a-main  w-full h-screen bg-[#fff] flex items-center justify-center'>

        <FacialExpressin />
        <MoodSong />
       </div>
     
         
    </>
  )
}

export default App
