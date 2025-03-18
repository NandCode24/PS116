import React from 'react'
import logo from '../../assets/Logo.png'
import { NavLink } from 'react-router-dom'

function InstituteNavbar() {
  return (
    <div className='navbar'>
        {/* <img src={logo} alt="" width='max' height='2rem'/> */}
        <h1>LEARN SYNC</h1>
        <ul>
            <NavLink to='/institutehome' end><li>Home</li></NavLink>
            <NavLink to='institutecourses'><li>My Courses</li></NavLink>
        </ul>
        <button>Profile</button>
    </div>
  )
}

export default InstituteNavbar