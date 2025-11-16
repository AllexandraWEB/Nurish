import express from "express";
import * as favoritesController from "../controllers/favoritesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.get("/", auth, favoritesController.getFavorites);
router.post("/", auth, favoritesController.addFavorite);
router.delete("/:recipeTitle", auth, favoritesController.removeFavorite);
router.delete("/", auth, favoritesController.clearFavorites);

export default router;