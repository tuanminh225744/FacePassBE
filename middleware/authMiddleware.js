// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import verifyToken from '../utils/jwtUtils.js';

const protect = async (req, res, next) => {
    let token;

    // 1. Kiểm tra Authorization Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Lấy token từ header (dạng: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 2. Xác minh token
            const decoded = verifyToken(token);
            if (!decoded) {
                return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
            }

            // 3. Tìm người dùng (User) dựa trên ID trong token
            // Chọn các trường muốn lấy, loại trừ passwordHash
            req.user = await User.findById(decoded.id).select('-passwordHash');

            if (!req.user) {
                return res.status(401).json({ message: 'Người dùng không tồn tại.' });
            }

            // 4. Tiếp tục chạy endpoint nếu xác minh thành công
            next();

        } catch (error) {
            console.error(error);
            // Lỗi xác minh token (token không hợp lệ/hết hạn)
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Không có token, không được phép truy cập.' });
    }
};

module.exports = { protect };