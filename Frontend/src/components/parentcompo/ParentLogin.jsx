import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function ParentLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    studentId: '',
    studentPassword: ''
  });

  const [error, setError] = useState('');

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/parents/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Login successful!');
        navigate('/parenthome'); // Redirect to parent dashboard
      } else {
        setError(data.error || '❌ Invalid credentials');
      }
    } catch (error) {
      console.error('❌ Error logging in:', error);
      setError('❌ Server error. Please try again.');
    }
  };

  return (
    <div className="login-form parent">
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Show errors if any */}
        <div className='row'>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>

        <div className='row'>
          <div className="input-group">
            <label>Student ID:</label>
            <input type="number" name="studentId" value={formData.studentId} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Student Password:</label>
            <input type="password" name="studentPassword" value={formData.studentPassword} onChange={handleChange} required />
          </div>
        </div>
        <NavLink to='/parenthome'><button type="submit" className="login-btn">Login</button></NavLink>
      </form>
    </div>
  );
}

export default ParentLogin;
