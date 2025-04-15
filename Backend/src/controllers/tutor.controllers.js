import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { uploadImage, uploadVideo } from "../config/cloudinary.js";

// ✅ Register Tutor with Password Hashing
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

        // ✅ Hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert into database with hashed password
        const [result] = await pool.query(
            "INSERT INTO tutors (first_name, last_name, birthdate, mobile_number, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [firstName, lastName, birthDate, mobileNumber, email, username, hashedPassword]
        );

        // ✅ Get tutor ID
        const tutorId = result.insertId;

        res.status(201).json({ 
            message: "✅ Tutor registered successfully!", 
            tutorId: tutorId 
        });

    } catch (error) {
        console.error("❌ Error in registerTutor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Tutor Login with Password Verification
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

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, tutor.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ 
        message: "✅ Login successful!", 
        tutorId: tutor.tutor_id 
    });
});

export const createCourse = asyncHandler(async (req, res) => {
    try {
      const { tutor_id, title, description, resource_links } = req.body;
  
      if (!tutor_id || !title || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // ✅ Upload Thumbnail to Cloudinary
      const thumbnail_url = req.files["thumbnail"]
        ? req.files["thumbnail"][0].path
        : null;
  
      // ✅ Upload Video to Cloudinary
      const video_url = req.files["video"] ? req.files["video"][0].path : null;
  
      // ✅ Insert Course Data into MySQL
      const [result] = await pool.query(
        "INSERT INTO courses (tutor_id, title, description, thumbnail_url, video_url, resource_links) VALUES (?, ?, ?, ?, ?, ?)",
        [tutor_id, title, description, thumbnail_url, video_url, resource_links]
      );
  
      res.status(201).json({
        message: "✅ Course created successfully!",
        course_id: result.insertId,
      });
    } catch (error) {
      console.error("❌ Error in createCourse:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export const addResources = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { resource_links } = req.body;

        // ✅ Convert JSON Array to String for MySQL Storage
        const resourceLinksString = JSON.stringify(resource_links);

        // ✅ Update Course with Resources
        await pool.query("UPDATE courses SET resource_links = ? WHERE id = ?", [resourceLinksString, id]);

        res.status(200).json({ message: "Resources added successfully!" });
    } catch (error) {
        console.error("❌ Error in addResources:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
