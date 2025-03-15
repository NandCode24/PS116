import  {pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
    }

    await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
        [name, email, password, role]);

    res.status(201).json({ message: "User Registered Successfully" });
});

// ✅ Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const [user] = await pool.query("SELECT * FROM users WHERE email = ? AND password = ?", 
        [email, password]);

    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login Successful", user: user[0] });
});
export const registerAsStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if student already exists
        const [existingUser] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Student already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert student into database
        await pool.query(
            "INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "Student enrolled successfully!" });
    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Enroll as Parent
export const registerAsParent = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Enrolled as Parent successfully" });
});


export const registerAsTutor = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Enrolled as Tutor successfully" });
});


export const registerAsInstitute = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Enrolled as Institute successfully" });
});
