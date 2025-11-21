import express from "express";
import { register } from "../controllers/authConroller.js";
import { login } from "../controllers/authConroller.js";


const router = express.Router();

router.post ("/register", register)
router.post ("/login", login)

export default router


