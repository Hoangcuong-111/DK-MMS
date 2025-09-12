const express = require('express');
const router = express.Router();
const Joi = require('joi');
const EquipmentModel = require('../models/EquipmentModel');

// Joi validation schema for equipment create
const createEquipmentSchema = Joi.object({
  id: Joi.string().pattern(/^EQ\d{3}$/).required().messages({
    'string.pattern.base': 'Mã thiết bị phải theo định dạng EQ + 3 chữ số',
    'any.required': 'Mã thiết bị là bắt buộc',
  }),
  name: Joi.string().max(100).required().messages({
    'string.empty': 'Tên thiết bị là bắt buộc',
    'string.max': 'Tên thiết bị không được vượt quá 100 ký tự',
    'any.required': 'Tên thiết bị là bắt buộc',
  }),
  type: Joi.string().max(50).required().messages({
    'string.empty': 'Loại thiết bị là bắt buộc',
    'string.max': 'Loại thiết bị không được vượt quá 50 ký tự',
    'any.required': 'Loại thiết bị là bắt buộc',
  }),
  location: Joi.string().max(50).required().messages({
    'string.empty': 'Khu vực là bắt buộc',
    'string.max': 'Khu vực không được vượt quá 50 ký tự',
    'any.required': 'Khu vực là bắt buộc',
  }),
  manufacturer: Joi.string().max(100),
  model: Joi.string().max(50),
  serialNumber: Joi.string().alphanum().max(20),
  installationYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).messages({
    'number.min': 'Năm lắp đặt không được nhỏ hơn 1900',
    'number.max': 'Năm lắp đặt không được lớn hơn năm hiện tại',
  }),
  criticality: Joi.number().integer().min(1).max(5).messages({
    'number.min': 'Mức độ quan trọng phải từ 1 đến 5',
    'number.max': 'Mức độ quan trọng phải từ 1 đến 5',
  }),
  status: Joi.string().valid('active', 'maintenance', 'stopped', 'retired').default('active').messages({
    'any.only': 'Trạng thái không hợp lệ',
  }),
  technicalSpecs: Joi.object(),
  nextMaintenance: Joi.date(),
  documents: Joi.array(),
});

// Joi validation schema for equipment update
const updateEquipmentSchema = Joi.object({
  name: Joi.string().max(100).messages({
    'string.max': 'Tên thiết bị không được vượt quá 100 ký tự',
  }),
  type: Joi.string().max(50).messages({
    'string.max': 'Loại thiết bị không được vượt quá 50 ký tự',
  }),
  location: Joi.string().max(50).messages({
    'string.max': 'Khu vực không được vượt quá 50 ký tự',
  }),
  manufacturer: Joi.string().max(100),
  model: Joi.string().max(50),
  serialNumber: Joi.string().alphanum().max(20),
  installationYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).messages({
    'number.min': 'Năm lắp đặt không được nhỏ hơn 1900',
    'number.max': 'Năm lắp đặt không được lớn hơn năm hiện tại',
  }),
  criticality: Joi.number().integer().min(1).max(5).messages({
    'number.min': 'Mức độ quan trọng phải từ 1 đến 5',
    'number.max': 'Mức độ quan trọng phải từ 1 đến 5',
  }),
  status: Joi.string().valid('active', 'maintenance', 'stopped', 'retired').messages({
    'any.only': 'Trạng thái không hợp lệ',
  }),
  technicalSpecs: Joi.object(),
  nextMaintenance: Joi.date(),
  documents: Joi.array(),
});

/**
 * @route GET /api/equipments
 * @desc Lấy danh sách thiết bị
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    const { status, limit, offset } = req.query;
    const options = {
      where: status ? { status } : {},
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0
    };

    const equipments = await EquipmentModel.findAll(options);
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy danh sách thiết bị', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/equipments/:id
 * @desc Lấy chi tiết thiết bị
 * @access Private
 */
router.get('/:id', async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy chi tiết thiết bị', 
      error: error.message 
    });
  }
});

/**
 * @route POST /api/equipments
 * @desc Tạo thiết bị mới
 * @access Private (Admin/Manager)
 */
router.post('/', async (req, res) => {
  try {
    const { error } = createEquipmentSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newEquipment = await EquipmentModel.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(400).json({
      message: 'Lỗi tạo thiết bị',
      error: error.message
    });
  }
});

/**
 * @route PUT /api/equipments/:id
 * @desc Cập nhật thiết bị
 * @access Private (Admin/Manager)
 */
router.put('/:id', async (req, res) => {
  try {
    const { error } = updateEquipmentSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const updatedEquipment = await EquipmentModel.update(req.params.id, req.body);
    res.json(updatedEquipment);
  } catch (error) {
    res.status(400).json({
      message: 'Lỗi cập nhật thiết bị',
      error: error.message
    });
  }
});

/**
 * @route DELETE /api/equipments/:id
 * @desc Xóa thiết bị
 * @access Private (Admin)
 */
router.delete('/:id', async (req, res) => {
  try {
    await EquipmentModel.delete(req.params.id);
    res.json({ message: 'Xóa thiết bị thành công' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi xóa thiết bị', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/equipments/search
 * @desc Tìm kiếm thiết bị
 * @access Private
 */
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm' });
    }

    const results = await EquipmentModel.searchEquipment(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi tìm kiếm thiết bị', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/equipments/status-summary
 * @desc Thống kê trạng thái thiết bị
 * @access Private
 */
router.get('/status-summary', async (req, res) => {
  try {
    const summary = await EquipmentModel.getEquipmentStatusSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi thống kê trạng thái thiết bị', 
      error: error.message 
    });
  }
});

module.exports = router;
