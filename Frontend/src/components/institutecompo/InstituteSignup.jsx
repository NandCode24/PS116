import React from 'react'

function InstituteSignup() {
  return (
    <div className='signup institute-form'>
        <form>
          <div className='info'>
            <label>Instittute name:</label>
            <input type='text' name='instituteName' required/><br/>

            <label>Institute password:</label>
            <input type='password' name='institutePass' reuired/><br/>

            <label>University name:</label>
            <input type='text' name='universityName' required/><br/>

            <label>E-mail address:</label>
            <input type='email' name='emailAddress' required/><br/>

            <label>Institute address:</label>
            <input type='text' name='instituteAddress' requiredd/><br/>

            <button type='submit'>Create</button>
          </div>
        </form>
    </div>
  )
}

export default InstituteSignup