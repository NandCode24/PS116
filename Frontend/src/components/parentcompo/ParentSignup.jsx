import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ParentSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    role: '',
    mobileNumber: '',
    email: '',
    username: '',
    password: '',
    studentId: '',
    studentPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/parents/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Parent registered successfully!');
        navigate('/parenthome'); // Redirect after successful signup
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Error registering parent:', error);
      alert('❌ Failed to register. Please try again.');
    }
  };

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <div className='info'>
          <label>First name:</label>
          <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} required />
          <br /><br />

          <label>Last name:</label>
          <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} required />
          <br /><br />

          <label>Birth date:</label>
          <input type='date' name='birthDate' value={formData.birthDate} onChange={handleChange} required />
          <br /><br />

          <div className="role-container">
            <label>Role:</label>
            <div className="role-options">
              <input type="radio" id="father" name="role" value="Father" onChange={handleChange} required />
              <label htmlFor="father">Father</label>

              <input type="radio" id="mother" name="role" value="Mother" onChange={handleChange} required />
              <label htmlFor="mother">Mother</label>
            </div>
          </div><br />

          <label>Mobile number:</label>
          <input type='tel' name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} required /><br /><br />

          <label>E-mail address:</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
          <br /><br />

          <label>Username:</label>
          <input type='text' name='username' value={formData.username} onChange={handleChange} required />
          <br /><br />

          <label>Password:</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange} required />
          <br /><br />

          <label>Student ID:</label>
          <input type='number' name='studentId' value={formData.studentId} onChange={handleChange} required />
          <br /><br />

          <label>Student Password:</label>
          <input type='password' name='studentPassword' value={formData.studentPassword} onChange={handleChange} required /><br /><br />

          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ParentSignup;
