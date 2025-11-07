
import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Home from '../pages/Home'
import Images from '../pages/Images'
import About from '../pages/About'
import Uploadimages from '../pages/UploadImages'

const MainRotes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/images' element={<Images/>}/>
        <Route path='/uploadimages' element={<Uploadimages />}/>
        <Route path='/about' element={<About/>}/> 
    </Routes>
  )
}

export default MainRotes