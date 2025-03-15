import express from "express";
import { 
    registerAsParent, 
    registerAsTutor, 
    registerAsStudent, 
    registerAsInstitute 
} from "../controllers/user.controllers.js";

const router = express.Router();

// Define user routes
router.post("/register-tutor", registerAsTutor);
router.post("/register-parent", registerAsParent);
router.post("/register-institute", registerAsInstitute);
router.post("/register-student", registerAsStudent);


export default router;
