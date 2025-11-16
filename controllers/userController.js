// controllers/userController.js
const { generateToken } = require('../utils/jwtUtils'); // Import hàm utility

const loginUser = async (req, res) => {
    // ... logic kiểm tra người dùng ...
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            // Sử dụng hàm tạo token từ Utility
            token: generateToken(user._id), 
        });
    } else {
        res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }
};
module.exports = { loginUser };