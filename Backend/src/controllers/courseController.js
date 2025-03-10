import pool from "../config/db.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Course not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a course
export const createCourse = async (req, res) => {
  const { title, description, teacher_id } = req.body;
  try {
    const [result] = await pool.query("INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)", [title, description, teacher_id]);
    res.status(201).json({ message: "Course added", courseId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM courses WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
