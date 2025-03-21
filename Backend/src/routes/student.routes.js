import express from "express";
import { registerStudent, studentLogin } from "../controllers/student.controllers.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", studentLogin);

export default router;
 