// Import các thư viện cần thiết
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load biến môi trường từ file .env
dotenv.config();

// Khởi tạo ứng dụng Express
const app = express();

// Định nghĩa cổng (port) cho server
const PORT = process.env.PORT || 5000;

// Middleware (để server hiểu được dữ liệu JSON)
app.use(express.json());

// Hàm kết nối DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};
connectDB();

// Định nghĩa Route 
app.get('/', (req, res) => {
  res.send('Chào mừng đến với Backend Quản lý Nhân viên!');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy ở chế độ ${process.env.NODE_ENV} trên cổng ${PORT}`);
  console.log(`Truy cập: http://localhost:${PORT}`);
});