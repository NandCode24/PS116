import pool from "../config/db.js";

// Fetch Chat History
export const getChatHistory = async (req, res) => {
  try {
    const { userId, teacherId } = req.params;
    const [messages] = await pool.query(
      "SELECT * FROM chats WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at",
      [userId, teacherId, teacherId, userId]
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    await pool.query("INSERT INTO chats (sender_id, receiver_id, message) VALUES (?, ?, ?)", [senderId, receiverId, message]);
    res.json({ message: "Message sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
