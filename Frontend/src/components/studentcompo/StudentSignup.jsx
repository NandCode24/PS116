import React from 'react'

function StudentSignup() {
  return (
    <div className='signup'>
        <form>
          <div className='info'>
              <label>First name:</label>
              <input type='text' name='studentFirstName' required/><br/>

              <label>Last name:</label>
              <input type='text' name='studentLastName' required/><br/>

              <label>Birth date:</label>
              <input type='date' name='studentBirthDate' required/><br/>

              <label>Mobile number:</label>
              <input type='tel' name='studentNumer' required/><br/>

              <label>E-mail address:</label>
              <input type='email' name='studentEmail' reuired/><br/>

              <label>Username:</label>
              <input type='text' name='studentUsername' reuired/><br/>

              <label>Password:</label>
              <input type='password' name='studentPassword' required/><br/>

              <label>Your id:</label>
              <input type='number' name='studentId' readOnly/><br/>

              <button type='submit'>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default StudentSignup