import React from 'react'
import logo from '../../assets/LOGO ARROW SIDE WHITE RED.png'
import { NavLink } from 'react-router-dom'

function InstituteNavbar() {
  return (
    <div className='navbar'>
        <img src={logo} alt="" />
        
        <ul>
            <NavLink to='/institutehome' end><li>Home</li></NavLink>
            <NavLink to='institutecourses'><li>My Courses</li></NavLink>
        </ul>
        <button>Profile</button>
    </div>
  )
}

export default InstituteNavbar