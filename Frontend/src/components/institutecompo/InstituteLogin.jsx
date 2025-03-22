import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Institutelogin() {
    const [formData, setFormData] = useState({
        instituteCode: '',
        institutePass: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/institutes/login', formData, {
                headers: { "Content-Type": "application/json" }
            });

            // ✅ Save Token & Redirect
            localStorage.setItem('authToken', response.data.token);
            alert(response.data.message);
            navigate('/institutehome');
        } catch (error) {
            console.error("❌ Login Error:", error.response);
            setError(error.response?.data?.error || "Login failed. Try again.");
        }
    };

    return (
        <div className="login-form institute">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Institute Code:</label>
                    <input type="text" name="instituteCode" value={formData.instituteCode} onChange={handleChange} required />
                    <br/><br/>
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" name="institutePass" value={formData.institutePass} onChange={handleChange} required />
                </div>

                {error && <p className="error">{error}</p>}

                <NavLink to='/institutehome'><button type="submit" className="login-btn">Login</button></NavLink>
            </form>
        </div>
    );
}

export default Institutelogin;
