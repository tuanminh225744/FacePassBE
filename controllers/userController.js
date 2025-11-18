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

const createUser = async (req, res) => {
    try {
        const { username, password, email, role, associatedEmployeeId } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'username, password và email là bắt buộc.' });
        }

        const existingByUsername = await User.findOne({ username });
        if (existingByUsername) return res.status(409).json({ message: 'Username đã tồn tại.' });

        const existingByEmail = await User.findOne({ email });
        if (existingByEmail) return res.status(409).json({ message: 'Email đã tồn tại.' });

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            passwordHash,
            email,
            role: role || undefined,
            associatedEmployeeId: associatedEmployeeId || undefined
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo user.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, email, role, associatedEmployeeId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User không tồn tại.' });

        if (username && username !== user.username) {
            const conflict = await User.findOne({ username });
            if (conflict && String(conflict._id) !== String(userId)) {
                return res.status(409).json({ message: 'Username đã được sử dụng bởi người khác.' });
            }
            user.username = username;
        }

        if (email && email !== user.email) {
            const conflict = await User.findOne({ email });
            if (conflict && String(conflict._id) !== String(userId)) {
                return res.status(409).json({ message: 'Email đã được sử dụng bởi người khác.' });
            }
            user.email = email;
        }

        if (password) {
            user.passwordHash = await bcrypt.hash(password, 10);
        }

        if (role) user.role = role;
        if (typeof associatedEmployeeId !== 'undefined') user.associatedEmployeeId = associatedEmployeeId;

        const updated = await user.save();

        res.json({
            _id: updated._id,
            username: updated.username,
            email: updated.email,
            role: updated.role,
            associatedEmployeeId: updated.associatedEmployeeId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật user.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User không tồn tại.' });

        await User.findByIdAndDelete(userId);
        res.json({ message: 'Xóa user thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa user.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách user.' });
    }
};

export { loginUser, logoutUser,getAllUsers,createUser, updateUser, deleteUser };