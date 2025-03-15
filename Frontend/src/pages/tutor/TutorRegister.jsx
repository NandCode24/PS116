import React from 'react'
import { useNavigate } from 'react-router-dom'

function TutorLogin() {
  const navigate = useNavigate()
  return (
    <div className='register'>
        
          <h1>Start your Journey with <b>Learn Sync</b></h1>
        
        <div className='registerBtn'>
          <button onClick={() => navigate('tutorlogin')}>Login</button>
          <button onClick={() => navigate('tutorsignup')}>Signup</button>
        </div>
    </div>
  )
}

export default TutorLogin