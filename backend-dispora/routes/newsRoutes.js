import express from 'express';
import { 
  createNews, 
  updateNews, 
  deleteNews, 
  getAllNews, 
  getNewsById 
} from '../controllers/newsController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Dapatkan semua berita (publik)
router.get('/', getAllNews);

// Dapatkan detail berita (publik)
router.get('/:id', getNewsById);

// Buat berita baru (hanya admin)
router.post(
  '/', 
  isAuthenticated, 
  upload.single('gambar'), 
  createNews
);

// Update berita (hanya admin)
router.put(
  '/:id', 
  isAuthenticated, 
  upload.single('gambar'), 
  updateNews
);

// Hapus berita (hanya admin)
router.delete('/:id', isAuthenticated, deleteNews);

export default router;