import express from "express";
import { getChatResponse } from "../controllers/chatbot.controllers.js";

const router = express.Router();

// POST route to handle chatbot queries
router.post("/chat", getChatResponse);

export default router;
