const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

/**
 * @route POST /api/users/register
 * @desc Đăng ký người dùng mới
 * @access Public
 */
router.post('/register', async (req, res) => {
  try {
    const newUser = await UserModel.register(req.body);
    res.status(201).json({
      message: 'Đăng ký thành công',
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi đăng ký', 
      error: error.message 
    });
  }
});

/**
 * @route POST /api/users/login
 * @desc Đăng nhập
 * @access Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc' });
    }

    const loginResult = await UserModel.login(email, password);
    res.json(loginResult);
  } catch (error) {
    res.status(401).json({ 
      message: 'Đăng nhập thất bại', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/users
 * @desc Lấy danh sách người dùng
 * @access Private (Admin)
 */
router.get('/', async (req, res) => {
  try {
    const { role, limit, offset } = req.query;
    const options = {
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0,
      select: 'id, username, email, full_name, role, department'
    };

    const users = role 
      ? await UserModel.getUsersByRole(role)
      : await UserModel.findAll(options);

    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy danh sách người dùng', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/users/:id
 * @desc Lấy chi tiết người dùng
 * @access Private
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Loại bỏ thông tin nhạy cảm
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy chi tiết người dùng', 
      error: error.message 
    });
  }
});

/**
 * @route PUT /api/users/:id
 * @desc Cập nhật thông tin người dùng
 * @access Private
 */
router.put('/:id', async (req, res) => {
  try {
    // Loại bỏ các trường không được phép cập nhật
    const { password, email, ...updateData } = req.body;

    const updatedUser = await UserModel.update(req.params.id, updateData);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi cập nhật người dùng', 
      error: error.message 
    });
  }
});

/**
 * @route DELETE /api/users/:id
 * @desc Xóa người dùng
 * @access Private (Admin)
 */
router.delete('/:id', async (req, res) => {
  try {
    await UserModel.delete(req.params.id);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi xóa người dùng', 
      error: error.message 
    });
  }
});

module.exports = router;
