import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';


function TutorSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    mobileNumber: '',
    email: '',
    username: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // ✅ Success message
  const [error, setError] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccessMessage('');

  try {
      const response = await axios.post('http://localhost:5000/tutors/register', formData);

      console.log("✅ Registration successful:", response.data);
      setSuccessMessage(response.data.message); 

      // ✅ Show alert when registration is successful
      alert(`🎉 Registration successful!`);

  } catch (err) {
      console.error("❌ Error response:", err.response);
      setError(err.response?.data?.error || 'Error registering tutor');
  }
};

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <div className='info'>
          <label>First name:</label>
          <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} required />
          <br /><br/>

          <label>Last name:</label>
          <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} required />
          <br /><br/>

          <label>Birth date:</label>
          <input type='date' name='birthDate' value={formData.birthDate} onChange={handleChange} required />
          <br /><br/>

          <label>Mobile number:</label>
          <input type='tel' name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} required /><br/><br />

          <label>E-mail address:</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
          <br /><br/>

          <label>Username:</label>
          <input type='text' name='username' value={formData.username} onChange={handleChange} required />
          <br /><br/>

          <label>Password:</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange} required />
          <br /><br/>

            <button type='submit'>Submit</button>
          </div>
        </form>


      
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

    </div>
  );
}

export default TutorSignup;
