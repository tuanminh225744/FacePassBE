// attendanceLogDetailSchema.js (Không cần tạo Model)
const mongoose = require('mongoose');

const AttendanceLogDetailSchema = new mongoose.Schema({
    time: { type: Date, required: true },
    type: { 
        type: String, 
        enum: ['IN', 'OUT'], 
        required: true 
    },
    imageURL: { type: String, required: true } // Đường dẫn đến Azure Blob Storage
}, { _id: false }); // Không cần ID riêng cho mỗi chi tiết log

module.exports = AttendanceLogDetailSchema;