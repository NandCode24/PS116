import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js"; // Ensure you have your MySQL DB connection

// Student Sign Up Controller
const studentRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if student already exists
    const [existingUser] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert student into the database
    await pool.query("INSERT INTO students (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
});

// Student Login Controller
const studentLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const [user] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const student = user[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Login successful", token });
});

export { studentRegister, studentLogin };
