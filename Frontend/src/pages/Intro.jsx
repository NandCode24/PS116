import React from 'react'
import logo from '../assets/learnsync_no_bg.png'
import { NavLink, Outlet } from 'react-router-dom'

function Intro() {
  return (
    <div>
        <meta charSet='UTF-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <div className='Intro'>
            <img src={logo} alt="" width='max' height='500px'/>
            <div className='para'>
                <h1><b>ONE STOP DESTINATION FOR QUALITY LEARNING</b></h1>

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

                <div className='btn'>
                    <NavLink to='/studentregister'><button >Enroll as Student</button></NavLink>
                    <NavLink to='/tutorregister'><button >Enroll as Tutor</button></NavLink>
                    <NavLink to='/parentregister'><button >Enroll as Parent</button></NavLink>
                    <NavLink to='/instituteregister'><button >Create Institute</button></NavLink>
                </div>
            </div>
            
        </div>
        {/* <Outlet /> */}
    </div>
  )
}

export default Intro