import React, { useState } from "react";
import axios from "axios";

function StudentSignup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        mobileNumber: "",
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", formData); // 🔍 Debugging output

        try {
            const response = await axios.post("http://localhost:5000/students/register", formData, {
                headers: { "Content-Type": "application/json" },
            });

            alert(response.data.message); // Show success message
        } catch (error) {
            console.error("Error response:", error.response); // Debug error
            alert(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <div className="info">
                    <label>First Name:</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} /><br />

                    <label>Last Name:</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} /><br />

                    <label>Birth Date:</label>
                    <input type="date" name="birthDate" required value={formData.birthDate} onChange={handleChange} /><br />

                    <label>Mobile Number:</label>
                    <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} /><br />

                    <label>Email Address:</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} /><br />

                    <label>Username:</label>
                    <input type="text" name="username" required value={formData.username} onChange={handleChange} /><br />

                    <label>Password:</label>
                    <input type="password" name="password" required value={formData.password} onChange={handleChange} /><br />

                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default StudentSignup;
