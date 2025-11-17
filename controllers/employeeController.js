// controllers/employeeController.js
import Employee from '../models/EmployeeModel.js';

const createEmployee = async (req, res) => {
    // Lấy dữ liệu từ body request
    const { 
        employeeId, 
        name, 
        email, 
        department, 
        personIdAzure, 
        personGroupIdAzure 
    } = req.body;

    // --- 1. Kiểm tra dữ liệu bắt buộc ---
    if (!employeeId || !name || !email || !personIdAzure || !personGroupIdAzure) {
        return res.status(400).json({ 
            message: 'Vui lòng cung cấp đầy đủ: Mã nhân viên, Tên, Email, Person ID Azure và Person Group ID Azure.' 
        });
    }

    try {
        // --- 2. Kiểm tra trùng lặp ---
        const employeeExists = await Employee.findOne({ $or: [{ employeeId }, { email }] });
        if (employeeExists) {
            return res.status(400).json({ 
                message: 'Mã nhân viên hoặc Email đã tồn tại trong hệ thống.' 
            });
        }

        // --- 3. Tạo bản ghi Nhân viên mới ---
        const employee = await Employee.create({
            employeeId,
            name,
            email,
            department,
            personIdAzure,
            personGroupIdAzure,
            // Các trường khác (persistedFaceIdsAzure, enrollmentImages) sẽ được 
            // cập nhật sau khi gọi thành công Azure Face API để đăng ký khuôn mặt.
        });

        if (employee) {
            // Mã lỗi 201: Created
            res.status(201).json({
                message: 'Tạo nhân viên thành công.',
                data: {
                    _id: employee._id,
                    employeeId: employee.employeeId,
                    name: employee.name,
                    email: employee.email,
                }
            });
        } else {
            res.status(400).json({ message: 'Dữ liệu nhân viên không hợp lệ.' });
        }

    } catch (error) {
        console.error('Lỗi khi tạo nhân viên:', error);
        res.status(500).json({ 
            message: 'Lỗi máy chủ nội bộ khi tạo nhân viên.', 
            error: error.message 
        });
    }
};

export { createEmployee };