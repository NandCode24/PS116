import express from "express";
import { tutorRegister, tutorLogin } from "../controllers/tutor.controllers.js";

const router = express.Router();

router.post("/register", tutorRegister);
router.post("/login", tutorLogin);

export default router;
