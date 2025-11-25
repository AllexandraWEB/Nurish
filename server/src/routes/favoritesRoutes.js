import express from 'express';
import { addToFavorites, removeFromFavorites, getFavorites } from '../controllers/favoritesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All favorites routes require authentication
router.post('/add', authenticateToken, addToFavorites);
router.post('/remove', authenticateToken, removeFromFavorites);
router.get('/', authenticateToken, getFavorites);

export default router;