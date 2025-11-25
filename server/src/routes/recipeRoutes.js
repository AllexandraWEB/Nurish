import express from 'express';
import * as recipeController from '../controllers/recipeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', recipeController.getAllRecipes); // Get all recipes

// Protected routes
router.get('/my-recipes', authenticateToken, recipeController.getMyRecipes); // Get user's recipes
router.get('/:id', recipeController.getRecipeById); // Get single recipe (public)
router.post('/', authenticateToken, recipeController.createRecipe); // Create recipe
router.put('/:id', authenticateToken, recipeController.updateRecipe); // Update recipe
router.delete('/:id', authenticateToken, recipeController.deleteRecipe); // Delete recipe

export default router;