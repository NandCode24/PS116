import React from 'react'
import { useNavigate } from 'react-router-dom'

function InstituteLogin() {
  const navigate = useNavigate()
  return (
    <div className='register'>
        
          <h1>Start your Journey with <b>Learn Sync</b></h1>
      
        <div className='registerBtn'>
          <button onClick={() => navigate('institutelogin')}>Login</button>
          <button onClick={() => navigate('institutesignup')}>Signup</button>
        </div>
    </div>
  )
}

export default InstituteLogin