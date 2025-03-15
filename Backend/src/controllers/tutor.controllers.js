import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js"; // MySQL connection

// Tutor Sign Up
const tutorRegister = asyncHandler(async (req, res) => {
    const { name, email, password, expertise } = req.body;

    if (!name || !email || !password || !expertise) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if tutor already exists
    const [existingUser] = await pool.query("SELECT * FROM tutors WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "Tutor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    await pool.query("INSERT INTO tutors (name, email, password, expertise) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, expertise]);

    res.status(201).json({ message: "Tutor registered successfully" });
});

// Tutor Login
const tutorLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const [user] = await pool.query("SELECT * FROM tutors WHERE email = ?", [email]);
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const tutor = user[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, tutor.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: tutor.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Login successful", token });
});

export { tutorRegister, tutorLogin };
