// routes/userRoutes.js
import express from 'express';
import { loginUser, logoutUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Endpoint này yêu cầu người dùng phải đăng nhập hợp lệ (có token)
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser); 

export default router;