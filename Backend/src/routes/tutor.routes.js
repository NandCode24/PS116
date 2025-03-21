import express from "express";
import { upload } from "../middlewares/multerConfig.js";
import { registerTutor, loginTutor } from "../controllers/tutor.controllers.js";

const router = express.Router();

// ✅ Register Tutor
router.post("/register", registerTutor);

// ✅ Login Tutor
router.post("/login", loginTutor);



export default router;
