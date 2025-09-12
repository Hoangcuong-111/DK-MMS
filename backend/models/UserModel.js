const BaseModel = require('./BaseModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserModel extends BaseModel {
  constructor() {
    super('users');
  }

  /**
   * Đăng ký người dùng mới
   * @param {Object} userData - Thông tin người dùng
   * @returns {Promise} Kết quả đăng ký
   */
  async register(userData) {
    try {
      // Validate dữ liệu
      this.validateUserData(userData);

      // Kiểm tra email đã tồn tại
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email đã được sử dụng');
      }

      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      // Thiết lập vai trò mặc định
      userData.role = userData.role || 'viewer';

      // Tạo người dùng
      return await this.create(userData);
    } catch (error) {
      console.error('Lỗi đăng ký người dùng:', error);
      throw error;
    }
  }

  /**
   * Đăng nhập
   * @param {string} email - Địa chỉ email
   * @param {string} password - Mật khẩu
   * @returns {Promise} Thông tin đăng nhập và token
   */
  async login(email, password) {
    try {
      // Tìm người dùng theo email
      const user = await this.findByEmail(email);
      if (!user) {
        throw new Error('Người dùng không tồn tại');
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Mật khẩu không chính xác');
      }

      // Tạo token
      const token = this.generateToken(user);

      // Cập nhật thời gian đăng nhập cuối
      await this.update(user.id, { last_login: new Date() });

      return {
        user: this.sanitizeUser(user),
        token
      };
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error;
    }
  }

  /**
   * Tìm người dùng theo email
   * @param {string} email - Địa chỉ email
   * @returns {Promise} Thông tin người dùng
   */
  async findByEmail(email) {
    try {
      const [rows] = await this.db.query(
        `SELECT * FROM ${this.tableName} WHERE email = ?`, 
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Lỗi tìm người dùng theo email:', error);
      throw error;
    }
  }

  /**
   * Tạo token xác thực
   * @param {Object} user - Thông tin người dùng
   * @returns {string} Token JWT
   */
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
  }

  /**
   * Lấy danh sách người dùng theo vai trò
   * @param {string} role - Vai trò
   * @returns {Promise} Danh sách người dùng
   */
  async getUsersByRole(role) {
    try {
      return await this.findAll({
        where: { role },
        select: 'id, username, email, full_name, department'
      });
    } catch (error) {
      console.error('Lỗi lấy người dùng theo vai trò:', error);
      throw error;
    }
  }

  /**
   * Validate dữ liệu người dùng
   * @param {Object} data - Dữ liệu người dùng
   * @throws {Error} Nếu dữ liệu không hợp lệ
   */
  validateUserData(data) {
    const requiredFields = ['username', 'email', 'password'];
    
    // Kiểm tra các trường bắt buộc
    requiredFields.forEach(field => {
      if (!data[field]) {
        throw new Error(`Thiếu trường bắt buộc: ${field}`);
      }
    });

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Địa chỉ email không hợp lệ');
    }

    // Validate mật khẩu
    if (data.password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }

    // Validate vai trò
    this.validateUserRole(data.role);
  }

  /**
   * Validate vai trò người dùng
   * @param {string} role - Vai trò
   * @throws {Error} Nếu vai trò không hợp lệ
   */
  validateUserRole(role) {
    const validRoles = ['admin', 'manager', 'technician', 'viewer'];
    if (role && !validRoles.includes(role)) {
      throw new Error('Vai trò người dùng không hợp lệ');
    }
  }

  /**
   * Loại bỏ thông tin nhạy cảm của người dùng
   * @param {Object} user - Thông tin người dùng
   * @returns {Object} Thông tin người dùng an toàn
   */
  sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = new UserModel();
