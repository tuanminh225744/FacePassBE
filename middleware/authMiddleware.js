// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import {verifyToken} from '../utils/jwtUtils.js';

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

const admin = (req, res, next) => {
    // req.user được gắn vào sau khi middleware 'protect' chạy
    if (req.user && req.user.role === 'Admin') {
        next(); // Được phép đi tiếp
    } else {
        // Mã lỗi 403: Forbidden (Không có quyền)
        res.status(403).json({ 
            message: 'Truy cập bị từ chối. Chỉ Admin mới có quyền thực hiện thao tác này.' 
        });
    }
};

export { protect, admin };