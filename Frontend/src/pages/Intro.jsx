import React from 'react'
import logo from '../assets/LOGO ARROW WHITE RED.png'
import { NavLink, Outlet } from 'react-router-dom'

function Intro() {
  return (
    <div className='intro'>
        <h1><b>ONE STOP DESTINATION FOR QUALITY LEARNING</b></h1>
        <div className='para'>
            <div className='image'>
                <img src={logo} alt="" />
            </div>

            <div className='details'>
                <p>-Where <b>A Student</b> can learn from individual tutor or his/her respective Institute.</p>
                <br/>
                <p>-With <b>Pesonalised AI System</b> for clearing Doubts & Questions!</p>
                <br/>
                <p>-Where <b>A Tutor</b> can teach as an individual.</p>
                <br/>
                <p>-Where <b>A Parent</b> can see their childs progress.</p>
                <br/>
                <p>-Where <b>An Institute</b> can create institute and teach according to their curriculum.</p>
                <br/>
            </div>
        </div>
        <div className='btn'>
            <NavLink to='/studentregister'><button >Enroll as Student</button></NavLink>
            <NavLink to='/tutorregister'><button >Enroll as Tutor</button></NavLink>
            <NavLink to='/parentregister'><button >Enroll as Parent</button></NavLink>                  
            <NavLink to='/instituteregister'><button >Create Institute</button></NavLink>
        </div>
    </div>
  )
}

export default Intro