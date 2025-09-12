const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

/**
 * Middleware xác thực người dùng
 * @param {Object} req - Đối tượng request
 * @param {Object} res - Đối tượng response
 * @param {Function} next - Hàm middleware tiếp theo
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Không có token, từ chối truy cập' });
    }

    // Kiểm tra định dạng token
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Định dạng token không hợp lệ' });
    }

    const token = parts[1];

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra người dùng
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    // Gán thông tin người dùng vào request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token đã hết hạn' });
    }

    res.status(500).json({ 
      message: 'Lỗi xác thực', 
      error: error.message 
    });
  }
};

/**
 * Middleware kiểm tra quyền truy cập
 * @param {Array} allowedRoles - Các vai trò được phép
 * @returns {Function} Middleware kiểm tra vai trò
 */
const checkRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Chưa xác thực' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Không có quyền truy cập',
        requiredRoles: allowedRoles
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  checkRoles
};
