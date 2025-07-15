import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FacialExpressin  from './components/FacialExpressin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
         <FacialExpressin />
    </>
  )
}

export default App
