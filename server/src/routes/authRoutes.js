import express from "express";
import { handleRegister, handleLogin } from "../controllers/authController.js";

const router = express.Router();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
router.post("/register", handleRegister);
router.post("/login", handleLogin);

export default router;
