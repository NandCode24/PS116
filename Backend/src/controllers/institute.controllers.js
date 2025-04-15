import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

console.log("✅ Loaded JWT_SECRET:", JWT_SECRET); // Check if the secret is loaded


    
export const registerInstitute = asyncHandler(async (req, res) => {
    try {
        const { instituteName, institutePass, universityName, emailAddress, instituteAddress, instituteCode } = req.body;

        // ✅ Validate Input
        if (!instituteName || !institutePass || !universityName || !emailAddress || !instituteAddress || !instituteCode) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if Institute Code Already Exists
        const [existingInstitute] = await pool.query("SELECT * FROM institutes WHERE institute_code = ?", [instituteCode]);
        if (existingInstitute.length > 0) {
            return res.status(400).json({ error: "Institute code already exists" });
        }

        // ✅ Hash Password
        const hashedPassword = await bcrypt.hash(institutePass, 10);

        // ✅ Insert into Database
        await pool.query(
            "INSERT INTO institutes (institute_name, institute_password, university_name, email, institute_address, institute_code) VALUES (?, ?, ?, ?, ?, ?)",
            [instituteName, hashedPassword, universityName, emailAddress, instituteAddress, instituteCode]
        );

        res.status(201).json({ message: "✅ Institute registered successfully!" });

    } catch (error) {
        console.error("❌ Error in registerInstitute:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// ✅ Institute Login Function
export const instituteLogin = asyncHandler(async (req, res) => {
    try {
        const { instituteCode, institutePass } = req.body;

        // ✅ Validate Input
        if (!instituteCode || !institutePass) {
            return res.status(400).json({ error: "Institute code and password are required" });
        }

        // ✅ Fetch Institute from DB
        const [institutes] = await pool.query("SELECT * FROM institutes WHERE institute_code = ?", [instituteCode]);

        if (institutes.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const institute = institutes[0];

        // ✅ Compare Password
        const isMatch = await bcrypt.compare(institutePass, institute.institute_password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { id: institute.institute_id, instituteCode: institute.institute_code },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "✅ Login successful!",
            token,
            institute: {
                id: institute.institute_id,
                instituteName: institute.institute_name,
                universityName: institute.university_name,
                email: institute.email,
                instituteCode: institute.institute_code
            }
        });

    } catch (error) {
        console.error("❌ Error in instituteLogin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});