import express from 'express';
import {
  loginAdmin,
  logoutAdmin,
  checkSession
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/check-session', checkSession);

export default router;
