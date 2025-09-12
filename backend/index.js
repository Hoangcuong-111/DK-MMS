require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/userRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware cơ bản
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware ghi log (tùy chọn)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Các routes công khai
app.use('/api/users', userRoutes);

// Middleware xác thực cho các route yêu cầu đăng nhập
app.use('/api/equipments', authMiddleware.authMiddleware, equipmentRoutes);
app.use('/api/maintenances', authMiddleware.authMiddleware, maintenanceRoutes);
app.use('/api/incidents', authMiddleware.authMiddleware, incidentRoutes);
app.use('/api/inventories', authMiddleware.authMiddleware, inventoryRoutes);

// Route gốc
app.get('/', (req, res) => {
  res.json({ 
    message: 'CMMS Dashboard Backend đã sẵn sàng', 
    version: '1.0.0' 
  });
});

// ✅ Route kiểm tra tình trạng server (healthcheck)
app.get('/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Middleware xử lý lỗi
app.use(errorMiddleware);

// Xử lý các route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ message: 'Không tìm thấy route' });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

// Xử lý các lỗi không được bắt
process.on('unhandledRejection', (reason, promise) => {
  console.error('Lỗi không được xử lý:', reason);
});

module.exports = app;
