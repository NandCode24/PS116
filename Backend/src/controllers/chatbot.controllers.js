import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`,
      {
        prompt: { text: message },
      }
    );

    res.json({ response: response.data.candidates[0]?.output || "No response" });
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
};
