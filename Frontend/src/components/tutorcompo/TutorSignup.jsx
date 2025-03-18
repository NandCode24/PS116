import React from 'react'
import { NavLink } from 'react-router-dom'

function TutorSignup() {
  return (
    <div className='signup'>
        <form>
          <div className='info'>
            <label>First name:</label>
            <input type='text' name='tutorFirstName' required/><br/>

            <label>Last name:</label>
            <input type='text' name='tutorLastName' required/><br/>

            <label>Birth date:</label>
            <input type='date' name='tutorBirthDate' required/><br/>

            <label>Mobile number:</label>
            <input type='tel' name='tutorNumer' required/><br/>

            <label>E-mail address:</label>
            <input type='email' name='tutorEmail' reuired/><br/>

            <label>Username:</label>
            <input type='text' name='tutorUsername' reuired/><br/>

            <label>Password:</label>
            <input type='password' name='tutorPassword' required/><br/>

            <NavLink to='/tutorhome'><button type='submit'>Submit</button></NavLink>
          </div>
        </form>
    </div>
  )
}

export default TutorSignup