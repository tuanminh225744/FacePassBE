// routes/employeeRoutes.js
import express from 'express';
import { createEmployee } from '../controllers/employeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import e from 'express';

const router = express.Router();

// Endpoint này yêu cầu người dùng phải đăng nhập hợp lệ (có token)
router.post('/', protect, admin, createEmployee); 
// router.get('/', protect, getEmployees); // Lấy danh sách nhân viên cũng cần xác thực

export default router;