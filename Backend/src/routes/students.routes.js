import express from "express";
import { studentRegister, studentLogin } from "../controllers/student.controllers.js";

const router = express.Router();

router.post("/register", studentRegister);
router.post("/login", studentLogin);

export default router;
