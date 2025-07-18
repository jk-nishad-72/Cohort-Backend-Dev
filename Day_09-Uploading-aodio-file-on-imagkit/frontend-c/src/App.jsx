import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FaceExprr  from './components/FaceExprr'
import Moodsong  from './components/Moodsong'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     

     < FaceExprr/>
     < Moodsong/>

    </>
  )
}

export default App
