// UserModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    passwordHash: { 
        type: String, 
        required: true 
    }, // Luôn lưu mật khẩu đã hash!
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    role: { 
        type: String, 
        enum: ['Admin', 'HRManager', 'ReadOnly'], 
        default: 'ReadOnly' 
    },
    associatedEmployeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        sparse: true // Cho phép nhiều tài liệu có trường này là null
    } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);