import React from 'react'
import logo from '../../assets/LOGO ARROW SIDE WHITE RED.png'
import { NavLink } from 'react-router-dom'

function TutorNavbar() {
  return (
    <div className='navbar'>
        <img src={logo} alt="" />
        
        <ul>
            <NavLink to='/tutorhome' end><li>Home</li></NavLink>
            <NavLink to='tutorcourses'><li>My Courses</li></NavLink>
            <NavLink to='tutorcreatecourse'><li>Create course</li></NavLink>
        </ul>
        <button>Profile</button>
    </div>
  )
}

export default TutorNavbar