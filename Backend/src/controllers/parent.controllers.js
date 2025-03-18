import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

// ✅ Register Parent (With Student Verification)
export const registerParent = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, birthDate, role, mobileNumber, email, username, password, studentId, studentPassword } = req.body;

        // ✅ Validate Input
        if (!firstName?.trim() || !lastName?.trim() || !birthDate || !role?.trim() ||
            !mobileNumber?.toString().trim() || !email?.trim() || !username?.trim() || !password?.trim() ||
            !studentId || !studentPassword?.trim()) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if Parent Username Already Exists
        const [existingParent] = await pool.query("SELECT * FROM parents WHERE username = ?", [username]);
        if (existingParent.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // ✅ Check if Student Exists
        const [students] = await pool.query("SELECT * FROM students WHERE id = ?", [studentId]);

        if (students.length === 0) {
            return res.status(400).json({ error: "Invalid Student ID" });
        }

        const student = students[0];

        // ✅ Verify Student Password
        const isPasswordMatch = await bcrypt.compare(studentPassword, student.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid Student Password" });
        }

        // ✅ Hash Parent's Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ✅ Insert Parent into Database
        await pool.query(
            "INSERT INTO parents (first_name, last_name, birth_date, role, mobile_number, email, username, password, student_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, birthDate, role, mobileNumber, email, username, hashedPassword, studentId]
        );

        res.status(201).json({ message: "✅ Parent registered successfully!" });

    } catch (error) {
        console.error("❌ Error in registerParent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ Parent Login with Student Verification
export const loginParent = asyncHandler(async (req, res) => {
    try {
        const { username, password, studentId, studentPassword } = req.body;
        
        // ✅ Validate Input
        if (!username || !password || !studentId || !studentPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Fetch Parent from Database
        const [parents] = await pool.query("SELECT * FROM parents WHERE username = ? AND student_id = ?", [username, studentId]);

        if (!parents || parents.length === 0) {
            return res.status(401).json({ error: "Invalid parent credentials or student ID" });
        }

        const parent = parents[0];

        // ✅ Compare Parent's Password
        const isParentMatch = await bcrypt.compare(password, parent.password);
        if (!isParentMatch) {
            return res.status(401).json({ error: "Invalid parent username or password" });
        }

        // ✅ Fetch Student from Database
        const [students] = await pool.query("SELECT * FROM students WHERE id = ?", [studentId]);

        if (!students || students.length === 0) {
            return res.status(401).json({ error: "Student ID does not exist" });
        }

        const student = students[0];

        // ✅ Compare Student's Password
        const isStudentMatch = await bcrypt.compare(studentPassword, student.password);
        if (!isStudentMatch) {
            return res.status(401).json({ error: "Invalid student password" });
        }

        // ✅ Successful Login Response
        res.status(200).json({ 
            message: "✅ Login successful!", 
            parent_id: parent.id,
            student_id: student.id
        });

    } catch (error) {
        console.error("❌ Error in parentLogin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Fetch Student's Progress (Parent Access)
export const getStudentProgress = asyncHandler(async (req, res) => {
    try {
        const { parentId } = req.params;

        // ✅ Fetch Parent and Associated Student ID
        const [parent] = await pool.query("SELECT student_id FROM parents WHERE id = ?", [parentId]);
        if (parent.length === 0) {
            return res.status(404).json({ error: "Parent not found" });
        }

        const studentId = parent[0].student_id;

        // ✅ Fetch Student's Progress (Modify this query based on your actual progress table)
        const [progress] = await pool.query("SELECT * FROM student_progress WHERE student_id = ?", [studentId]);

        res.status(200).json({ studentId, progress });

    } catch (error) {
        console.error("❌ Error in getStudentProgress:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
