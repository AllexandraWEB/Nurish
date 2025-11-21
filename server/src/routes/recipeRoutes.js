import express from 'express';
import {
  getAllRecipes,
  getUserRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/my-recipes', auth, getUserRecipes);
router.get('/:id', getRecipe);
router.post('/', auth, createRecipe);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);

export default router;