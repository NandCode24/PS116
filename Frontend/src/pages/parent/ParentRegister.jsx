import React from 'react'
import { useNavigate } from 'react-router-dom'

function ParentLogin() {
  const navigate = useNavigate()
  return (
    <div className='register'>
      
          <h1>Start your Journey with <b>Learn Sync</b></h1>
        
        <div className='registerBtn'>
          <button onClick={() => navigate('parentlogin')}>Login</button>
          <button onClick={() => navigate('parentsignup')}>Signup</button>
        </div>
    </div>
  )
}

export default ParentLogin