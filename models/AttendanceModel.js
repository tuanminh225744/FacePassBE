// AttendanceModel.js
import mongoose from 'mongoose';
import AttendanceLogDetailSchema from './attendanceLogDetailSchema.js';

const AttendanceSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    }, // Liên kết với Employee Model
    date: { 
        type: Date, 
        required: true, 
        index: true 
    }, // Ngày làm việc (chỉ cần phần ngày)
    checkInTime: { 
        type: Date 
    }, // Thời gian vào sớm nhất trong ngày
    checkOutTime: { 
        type: Date 
    }, // Thời gian ra muộn nhất trong ngày
    status: { 
        type: String, 
        enum: ['Present', 'Late', 'Absent'], 
        default: 'Absent' 
    },
    confidenceScore: { 
        type: Number 
    }, // Độ tin cậy lần chấm công cuối cùng

    // Lưu chi tiết tất cả các lần quẹt thẻ trong ngày
    logDetails: { 
        type: [AttendanceLogDetailSchema], 
        default: [] 
    } 

}, { timestamps: true });

// Đảm bảo chỉ có một bản ghi chấm công mỗi ngày cho mỗi nhân viên
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);