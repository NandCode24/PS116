import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js"; // MySQL connection

// Parent Sign Up
const parentRegister = asyncHandler(async (req, res) => {
    const { name, email, password, childAge } = req.body;

    if (!name || !email || !password || !childAge) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if parent already exists
    const [existingUser] = await pool.query("SELECT * FROM parents WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "Parent already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    await pool.query("INSERT INTO parents (name, email, password, childAge) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, childAge]);

    res.status(201).json({ message: "Parent registered successfully" });
});

// Parent Login
const parentLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const [user] = await pool.query("SELECT * FROM parents WHERE email = ?", [email]);
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const parent = user[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: parent.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Login successful", token });
});

export { parentRegister, parentLogin };
