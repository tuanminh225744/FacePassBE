// controllers/userController.js
import {generateToken} from "../utils/jwtUtils.js"; // Import hàm utility
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // 1. Kiểm tra username và tìm User trong DB
    const user = await User.findOne({ username });

    // 2. Kiểm tra mật khẩu
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
        // Mật khẩu đúng, tạo và gửi Token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), 
        });
    } else {
        res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
    }
};

const logoutUser = (req, res) => {
    // Với JWT, việc "logout" chủ yếu được xử lý ở phía client (xóa token khỏi localStorage).
    // Ở phía server, chúng ta chỉ cần trả về một thông báo thành công hoặc không làm gì cả.
    // Đối với dự án này, chỉ cần thông báo thành công cho client xóa token.
    res.status(200).json({ message: 'Đăng xuất thành công. Vui lòng xóa token khỏi client.' });
};

export { loginUser, logoutUser };