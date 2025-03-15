import React from 'react'

function ParentSignup() {
  return (
    <div className='signup'>
        <form>
          <div className='info'>
              <label>First name:</label>
              <input type='text' name='parentFirstName' required/><br/>

              <label>Last name:</label>
              <input type='text' name='parentLastName' required/><br/>

              <label>Birth date:</label>
              <input type='date' name='parentBirthDate' required/><br/>

              <div className="role-container">
                  <label>Role:</label>
                  <div className="role-options">
                      <input type="radio" id="father" name="role" required />
                      <label htmlFor="father">Father</label>

                      <input type="radio" id="mother" name="role" required />
                      <label htmlFor="mother">Mother</label>
                  </div>
              </div>
              <label>Mobile number:</label>
              <input type='tel' name='parentNumer' required/><br/>

              <label>E-mail address:</label>
              <input type='email' name='parentEmail' reuired/><br/>

              <label>Username:</label>
              <input type='text' name='parentUsername' reuired/><br/>

              <label>Password:</label>
              <input type='password' name='parentPassword' required/><br/>

              <label>Student id:</label>
              <input type='number' name='studentId' required/><br/>

              <button type='submit'>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default ParentSignup