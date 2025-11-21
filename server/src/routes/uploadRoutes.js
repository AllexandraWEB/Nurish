import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, uploadImage);
router.delete('/:publicId', auth, deleteImage);

export default router;