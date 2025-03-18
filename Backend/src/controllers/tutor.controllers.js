import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

// ✅ Register Tutor
export const registerTutor = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, birthDate, mobileNumber, email, username, password } = req.body;

        

        // Check if any required field is missing
        if (
            !firstName?.trim() || 
            !lastName?.trim() || 
            !birthDate || 
            !mobileNumber?.toString().trim() || 
            !email?.trim() || 
            !username?.trim() || 
            !password?.trim()
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email or username already exists
        const [existingUser] = await pool.query(
            "SELECT * FROM tutors WHERE email = ? OR username = ?",
            [email, username]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email or Username already exists" });
        }

        // Insert into database
        await pool.query(
            "INSERT INTO tutors (first_name, last_name, birthdate, mobile_number, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, birthDate, mobileNumber, email, username, password]
        );

        res.status(201).json({ message: "Tutor registered successfully!" });
    } catch (error) {
        console.error("Error in registerTutor:", error);
        res.status(500).json({ error: "Internal Server Error" ,tutor_id:tutor_id});
    }
});

// ✅ Tutor Login
export const loginTutor = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    // 🔍 Check if tutor exists in the database
    const [tutors] = await pool.query("SELECT * FROM tutors WHERE username = ?", [username]);

    if (tutors.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    const tutor = tutors[0];

    // 🔐 Verify password (if hashed using bcrypt)
    // const isMatch = await bcrypt.compare(password, tutor.password);
    // if (!isMatch) {
    //     return res.status(401).json({ error: "Invalid username or password" });
    // }

    if (tutor.password !== password) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", tutorId: tutor.tutor_id, });
});
