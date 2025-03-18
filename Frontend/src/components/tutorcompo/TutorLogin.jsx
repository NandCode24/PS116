import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';

function TutorLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/tutors/login', formData);

      console.log("✅ Login successful:", response.data);

      // Extract tutor ID from response
      const tutorId = response.data.tutorId;

      // Show success alert with tutor ID
      window.alert(`🎉 Login Successful!\nYour Tutor ID: ${tutorId}`);

      // Store token and tutor ID in localStorage (if needed)
      if (response.data.token) {
        localStorage.setItem('tutorToken', response.data.token);
      }
      localStorage.setItem('tutorId', tutorId);

    } catch (err) {
      console.error("❌ Login error:", err.response);
      setError(err.response?.data?.error || 'Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          <br/><br/>
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
}

export default TutorLogin;
