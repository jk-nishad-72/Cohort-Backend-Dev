
import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex items-center w-full justify-center gap-5 mt-5  text-2xl font-semibold ' >
        <NavLink to={'/'} > Home  </NavLink>
        <NavLink to={'/images'} > Images  </NavLink>
        <NavLink to={'/unploadimages'} > + Images  </NavLink> 
        <NavLink to={'/about'} > About  </NavLink>

    </div>
  )
}

export default Navbar