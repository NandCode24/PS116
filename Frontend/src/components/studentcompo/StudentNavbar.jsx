import React from 'react'
import logo from '../../assets/LOGO ARROW SIDE WHITE RED.png'
import { NavLink } from 'react-router-dom'

function StudentNavbar() {
  return (
    <div className='navbar'>
        <img src={logo} alt="" />
        
        <ul>
            <NavLink to='/studenthome' end><li>Home</li></NavLink>
            <NavLink to='studentenrolled'><li>Enrolled</li></NavLink>
        </ul>
        <button>Profile</button>
    </div>
  )
}

export default StudentNavbar