import express from "express";
import { createCourse } from "../controllers/courses.controllers.js";

const router = express.Router();

// Define routes
router.post("/create", createCourse);

export default router;
