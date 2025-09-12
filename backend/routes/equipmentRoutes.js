const express = require('express');
const router = express.Router();
const EquipmentModel = require('../models/EquipmentModel');

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
