// routes/userRoutes.js
import express from 'express';
import { loginUser, logoutUser, createUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Endpoint này yêu cầu người dùng phải đăng nhập hợp lệ (có token)
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser); 
router.post('/', protect,admin, createUser); // Chỉ Admin mới có thể tạo User
router.put('/:id', protect, admin, updateUser); // Chỉ Admin mới có thể cập nhật User
router.delete('/:id', protect, admin, deleteUser); // Chỉ Admin mới có thể xóa User
router.get('/', protect, admin, getAllUsers); // Chỉ Admin mới có thể lấy danh sách User

export default router;