import express from "express";
import { registerInstitute, instituteLogin } from "../controllers/institute.controllers.js";

const router = express.Router();

// ✅ Register Institute
router.post("/register", registerInstitute);

// ✅ Institute Login
router.post("/login", instituteLogin);

export default router;
