import React from 'react'
import logo from '../../assets/Logo.png'
import { NavLink } from 'react-router-dom'

function TutorNavbar() {
  return (
    <div className='navbar'>
        {/* <img src={logo} alt="" /> */}
        <h1>LEARN SYNC</h1>
        <ul>
            <NavLink to='/tutorhome' end><li>Home</li></NavLink>
            <NavLink to='tutorcourses'><li>My Courses</li></NavLink>
        </ul>
        <button>Profile</button>
    </div>
  )
}

export default TutorNavbar