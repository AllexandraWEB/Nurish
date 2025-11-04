import express from "express";
import { handleRegister, handleLogin, handleLogout, handleMe } from "../controllers/authController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/me", isAuth, handleMe);

export default router;
