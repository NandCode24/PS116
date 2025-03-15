import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js"; // MySQL connection

// Institute Sign Up
const instituteRegister = asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if institute already exists
    const [existingUser] = await pool.query("SELECT * FROM institutes WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "Institute already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    await pool.query("INSERT INTO institutes (name, email, password, address) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, address]);

    res.status(201).json({ message: "Institute registered successfully" });
});

// Institute Login
const instituteLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const [user] = await pool.query("SELECT * FROM institutes WHERE email = ?", [email]);
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const institute = user[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, institute.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: institute.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Login successful", token });
});

export { instituteRegister, instituteLogin };
