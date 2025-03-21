import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

// ✅ Register Student with Password Hashing
export const registerStudent = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, birthDate, mobileNumber, email, username, password } = req.body;

    
        if (!firstName?.trim() || !lastName?.trim() || !birthDate || 
            !mobileNumber?.toString().trim() || !email?.trim() || !username?.trim() || !password?.trim()) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const [existingUser] = await pool.query(
            "SELECT * FROM students WHERE email = ? OR username = ?",
            [email, username]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email or Username already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await pool.query(
            "INSERT INTO students (first_name, last_name, birth_date, mobile_number, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, birthDate, mobileNumber, email, username, hashedPassword]
        );

        res.status(201).json({ message: "✅ Student registered successfully!" });

    } catch (error) {
        console.error("❌ Error in registerStudent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Student Login with Password Verification
export const studentLogin = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const [students] = await pool.query("SELECT * FROM students WHERE username = ?", [username]);

        if (!students || students.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const student = students[0];

        

        if (!student.password) {
            console.error("❌ Error: Retrieved student has no password stored.");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({ 
            message: "✅ Login successful!", 
            student_id: student.id
        });

    } catch (error) {
        console.error("❌ Error in studentLogin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get All Courses

export const getAllCourses = asyncHandler(async (req, res) => {
    const [courses] = await pool.query("SELECT * FROM courses");
    res.status(200).json(courses);
});

// ✅ Get Enrolled Courses for a Student

export const getEnrolledCourses = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const [enrolledCourses] = await pool.query(
        `SELECT c.course_id, c.course_name, c.instructor 
         FROM enrollments e 
         JOIN courses c ON e.course_id = c.course_id 
         WHERE e.student_id = ?`,
        [studentId]
    );

    res.status(200).json(enrolledCourses);
});
