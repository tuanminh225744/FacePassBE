// EmployeeModel.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    // --- Thông tin Nhân viên Cơ bản ---
    employeeId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    department: { 
        type: String 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },

    // --- Dữ liệu Face (Gộp từ FaceData) ---
    personIdAzure: { 
        type: String, 
        required: true, 
        unique: true 
    }, // ID Người do Azure tạo ra (Person)
    personGroupIdAzure: { 
        type: String, 
        required: true 
    }, // ID Nhóm Người Azure (Person Group)
    persistedFaceIdsAzure: { 
        type: [String], 
        default: [] 
    }, // Array các ID khuôn mặt đã đăng ký (Persisted Face IDs)
    enrollmentImages: { 
        type: [String], 
        default: [] 
    }, // URLs ảnh gốc dùng để đăng ký khuôn mặt

}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

module.exports = mongoose.model('Employee', EmployeeSchema);