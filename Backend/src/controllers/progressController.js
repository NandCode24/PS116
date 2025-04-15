import pool from "../config/db.js";

// Get Progress for a User
export const getProgress = async (req, res) => {
  try {
    const [progress] = await pool.query("SELECT * FROM progress WHERE user_id = ?", [req.user.id]);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Progress
export const updateProgress = async (req, res) => {
  try {
    const { courseId, progress } = req.body;
    await pool.query("UPDATE progress SET progress = ? WHERE user_id = ? AND course_id = ?", [progress, req.user.id, courseId]);
    res.json({ message: "Progress updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
