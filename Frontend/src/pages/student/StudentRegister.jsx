import React from 'react'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {
  const navigate = useNavigate();
  return (
    <div className='register'>
        
        <div className='registerheading'>
          <h1>Start your Journey with <b>Learn Sync</b></h1>
        </div>      
        <div className='registerBtn'>
          <button onClick={() => navigate('studentlogin')}>Login</button>
          <button onClick={() => navigate('studentsignup')}>Signup</button>
        </div>
    </div>
  )
}

export default StudentLogin