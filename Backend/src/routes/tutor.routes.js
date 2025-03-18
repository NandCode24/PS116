import express from "express";
// import { registerTutor, loginTutor, addSubjects, getTutorProfile } from "../controllers/tutor.controllers.js";
import { registerTutor, loginTutor } from "../controllers/tutor.controllers.js";

const router = express.Router();

// ✅ Register Tutor
router.post("/register", registerTutor);

// ✅ Login Tutor
router.post("/login", loginTutor);

// router.put("/add-subjects/:tutorId", addSubjects);

// // ✅ Get Tutor Profile
// router.get("/profile/:tutorId", getTutorProfile);

export default router;
