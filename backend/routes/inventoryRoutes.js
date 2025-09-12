const express = require('express');
const router = express.Router();
const Joi = require('joi');
const InventoryModel = require('../models/InventoryModel');

/**
 * Joi validation schema for inventory create
 */
const createInventorySchema = Joi.object({
  code: Joi.string().pattern(/^INV\d{3}$/).required().messages({
    'string.pattern.base': 'Mã phụ tùng phải theo định dạng INV + 3 chữ số',
    'any.required': 'Mã phụ tùng là bắt buộc',
  }),
  name: Joi.string().max(100).required().messages({
    'string.empty': 'Tên phụ tùng là bắt buộc',
    'string.max': 'Tên phụ tùng không được vượt quá 100 ký tự',
    'any.required': 'Tên phụ tùng là bắt buộc',
  }),
  category: Joi.string().max(50).required().messages({
    'string.empty': 'Danh mục là bắt buộc',
    'string.max': 'Danh mục không được vượt quá 50 ký tự',
    'any.required': 'Danh mục là bắt buộc',
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    'number.min': 'Số lượng không được âm',
    'any.required': 'Số lượng là bắt buộc',
  }),
  min_stock: Joi.number().integer().min(0).default(0).messages({
    'number.min': 'Số lượng tối thiểu không được âm',
  }),
  unit: Joi.string().max(10).messages({
    'string.max': 'Đơn vị không được vượt quá 10 ký tự',
  }),
  supplier: Joi.string().max(100).messages({
    'string.max': 'Nhà cung cấp không được vượt quá 100 ký tự',
  }),
  stock_status: Joi.string().valid('low', 'normal', 'high').default('normal').messages({
    'any.only': 'Trạng thái tồn kho không hợp lệ',
  }),
});

/**
 * Joi validation schema for inventory update
 */
const updateInventorySchema = Joi.object({
  name: Joi.string().max(100).messages({
    'string.max': 'Tên phụ tùng không được vượt quá 100 ký tự',
  }),
  category: Joi.string().max(50).messages({
    'string.max': 'Danh mục không được vượt quá 50 ký tự',
  }),
  quantity: Joi.number().integer().min(0).messages({
    'number.min': 'Số lượng không được âm',
  }),
  min_stock: Joi.number().integer().min(0).messages({
    'number.min': 'Số lượng tối thiểu không được âm',
  }),
  unit: Joi.string().max(10).messages({
    'string.max': 'Đơn vị không được vượt quá 10 ký tự',
  }),
  supplier: Joi.string().max(100).messages({
    'string.max': 'Nhà cung cấp không được vượt quá 100 ký tự',
  }),
  stock_status: Joi.string().valid('low', 'normal', 'high').messages({
    'any.only': 'Trạng thái tồn kho không hợp lệ',
  }),
});

/**
 * @route GET /api/inventories
 * @desc Lấy danh sách phụ tùng
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    const { status, category, limit, offset } = req.query;
    const options = {
      where: {},
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0
    };

    if (status) options.where.stock_status = status;
    if (category) options.where.category = category;

    const inventories = await InventoryModel.findAll(options);
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy danh sách phụ tùng', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/inventories/:id
 * @desc Lấy chi tiết phụ tùng
 * @access Private
 */
router.get('/:id', async (req, res) => {
  try {
    const inventory = await InventoryModel.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: 'Không tìm thấy phụ tùng' });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy chi tiết phụ tùng', 
      error: error.message 
    });
  }
});

/**
 * @route POST /api/inventories
 * @desc Tạo phụ tùng mới
 * @access Private (Admin/Manager)
 */
router.post('/', async (req, res) => {
  try {
    const { error } = createInventorySchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newInventory = await InventoryModel.create(req.body);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(400).json({
      message: 'Lỗi tạo phụ tùng',
      error: error.message
    });
  }
});

/**
 * @route PUT /api/inventories/:id
 * @desc Cập nhật phụ tùng
 * @access Private (Admin/Manager)
 */
router.put('/:id', async (req, res) => {
  try {
    const { error } = updateInventorySchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const updatedInventory = await InventoryModel.update(req.params.id, req.body);
    res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({
      message: 'Lỗi cập nhật phụ tùng',
      error: error.message
    });
  }
});

/**
 * @route DELETE /api/inventories/:id
 * @desc Xóa phụ tùng
 * @access Private (Admin)
 */
router.delete('/:id', async (req, res) => {
  try {
    await InventoryModel.delete(req.params.id);
    res.json({ message: 'Xóa phụ tùng thành công' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi xóa phụ tùng', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/inventories/search
 * @desc Tìm kiếm phụ tùng
 * @access Private
 */
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm' });
    }

    const results = await InventoryModel.searchInventory(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi tìm kiếm phụ tùng', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/inventories/status-summary
 * @desc Thống kê trạng thái tồn kho
 * @access Private
 */
router.get('/status-summary', async (req, res) => {
  try {
    const summary = await InventoryModel.getInventoryStatusSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi thống kê trạng thái tồn kho', 
      error: error.message 
    });
  }
});

module.exports = router;