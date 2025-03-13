import React from 'react'
import logo from '../assets/learnsync_no_bg.png'

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
                    <button id='1'>Enroll as Student</button>
                    <button id='2'>Enroll as Tutor</button>
                    <button id='3'>Enroll as Parent</button>
                    <button id='4'>Create Institute</button>
                </div>
            </div>
           
        </div>
        
    </div>
  )
}

export default Intro