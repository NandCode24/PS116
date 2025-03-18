import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function InstituteSignup() {
    const [formData, setFormData] = useState({
        instituteName: '',
        institutePass: '',
        universityName: '',
        emailAddress: '',
        instituteAddress: '',
        instituteCode: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Validate Form Inputs
    const validateForm = () => {
        let newErrors = {};

        if (!formData.instituteName.trim()) newErrors.instituteName = "Institute name is required";
        if (!formData.institutePass.trim()) newErrors.institutePass = "Password is required";
        if (!formData.universityName.trim()) newErrors.universityName = "University name is required";
        if (!formData.emailAddress.trim()) newErrors.emailAddress = "Email is required";
        if (!formData.instituteAddress.trim()) newErrors.instituteAddress = "Institute address is required";
        if (!formData.instituteCode.trim()) newErrors.instituteCode = "Institute code is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        setSuccessMessage('');

        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:5000/institutes/register', formData, {
                headers: { "Content-Type": "application/json" }
            });

            setSuccessMessage(response.data.message); // ✅ Show success message
            alert(response.data.message); // ✅ Alert user

            setFormData({ // ✅ Clear form after success
                instituteName: '',
                institutePass: '',
                universityName: '',
                emailAddress: '',
                instituteAddress: '',
                instituteCode: ''
            });

            setErrors({}); // ✅ Clear previous errors

        } catch (error) {
            console.error("Registration error:", error.response);
            setServerError(error.response?.data?.error || "Error registering institute");
        }
    };

    return (
        <div className='signup institute-form'>
            <form onSubmit={handleSubmit}>
                <div className='info'>
                    <label>Institute Name:</label>
                    <input type='text' name='instituteName' value={formData.instituteName} onChange={handleChange} required />
                    {errors.instituteName && <p className="error">{errors.instituteName}</p>}<br />

                    <label>Institute Password:</label>
                    <input type='password' name='institutePass' value={formData.institutePass} onChange={handleChange} required />
                    {errors.institutePass && <p className="error">{errors.institutePass}</p>}<br />

                    <label>University Name:</label>
                    <input type='text' name='universityName' value={formData.universityName} onChange={handleChange} required />
                    {errors.universityName && <p className="error">{errors.universityName}</p>}<br />

                    <label>Email Address:</label>
                    <input type='email' name='emailAddress' value={formData.emailAddress} onChange={handleChange} required />
                    {errors.emailAddress && <p className="error">{errors.emailAddress}</p>}<br />

                    <label>Institute Address:</label>
                    <input type='text' name='instituteAddress' value={formData.instituteAddress} onChange={handleChange} required />
                    {errors.instituteAddress && <p className="error">{errors.instituteAddress}</p>}<br />

                    <label>Institute Code:</label>
                    <input type='text' name='instituteCode' value={formData.instituteCode} onChange={handleChange} required />
                    {errors.instituteCode && <p className="error">{errors.instituteCode}</p>}<br />

                    {serverError && <p className="error">{serverError}</p>}<br />
                    {successMessage && <p className="success">{successMessage}</p>}<br />

                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
}

export default InstituteSignup;
