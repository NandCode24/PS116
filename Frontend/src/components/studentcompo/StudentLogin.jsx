import React, { useState } from "react";
import axios from "axios";

function StudentLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(""); // 🔴 Store backend error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(""); // Clear previous errors

        if (!validateForm()) return; // ❌ Stop if validation fails

        try {
            const response = await axios.post("http://localhost:5000/students/login", formData, {
                headers: { "Content-Type": "application/json" },
            });

            alert(response.data.message); // ✅ Success
        } catch (error) {
            console.error("Login error:", error.response);
            setServerError(error.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                {serverError && <p className="error">{serverError}</p>} {/* 🔴 Show backend errors */}

                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default StudentLogin;
