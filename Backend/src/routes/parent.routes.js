import express from "express";
import { parentRegister, parentLogin } from "../controllers/parent.controllers.js";

const router = express.Router();

router.post("/register", parentRegister);
router.post("/login", parentLogin);

export default router;
