/**
 * Middleware xử lý lỗi toàn cục
 * @param {Error} err - Lỗi
 * @param {Object} req - Đối tượng request
 * @param {Object} res - Đối tượng response
 * @param {Function} next - Hàm middleware tiếp theo
 */
const errorMiddleware = (err, req, res, next) => {
  // Log lỗi để theo dõi
  console.error('Lỗi toàn cục:', err);

  // Xác định mã trạng thái
  const statusCode = err.status || 500;

  // Trả về phản hồi lỗi
  res.status(statusCode).json({
    message: err.message || 'Đã xảy ra lỗi không xác định',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      name: err.name
    })
  });
};

module.exports = errorMiddleware;
