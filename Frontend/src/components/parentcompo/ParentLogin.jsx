import React from 'react'

function ParentLogin() {
  return (
    <div className="login-form">
      <form>
        <div className="input-group">
          <label>Username:</label>
          <input type="text" name="username" required />
          <br/><br/>
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  )
}

export default ParentLogin