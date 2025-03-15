import express from "express";
import { instituteRegister, instituteLogin } from "../controllers/institute.controllers.js";

const router = express.Router();

router.post("/register", instituteRegister);
router.post("/login", instituteLogin);

export default router;
