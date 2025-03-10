const axios = require("axios");
require("dotenv").config();

const askAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // OpenAI API request
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: message }],
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        res.json({ reply: aiResponse });

    } catch (error) {
        console.error("AI Chatbot Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
};

module.exports = { askAI };
