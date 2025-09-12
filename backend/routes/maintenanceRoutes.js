const express = require('express');
const router = express.Router();
const MaintenanceModel = require('../models/MaintenanceModel');

/**
 * @route GET /api/maintenances
 * @desc Lấy danh sách bảo trì
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    const { status, type, equipment_id, limit, offset } = req.query;
    const options = {
      where: {},
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0
    };

    if (status) options.where.status = status;
    if (type) options.where.type = type;
    if (equipment_id) options.where.equipment_id = equipment_id;

    const maintenances = await MaintenanceModel.findAll(options);
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy danh sách bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/maintenances/:id
 * @desc Lấy chi tiết bảo trì
 * @access Private
 */
router.get('/:id', async (req, res) => {
  try {
    const maintenance = await MaintenanceModel.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Không tìm thấy kế hoạch bảo trì' });
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy chi tiết bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route POST /api/maintenances
 * @desc Lập kế hoạch bảo trì
 * @access Private (Admin/Manager/Technician)
 */
router.post('/', async (req, res) => {
  try {
    const newMaintenance = await MaintenanceModel.scheduleMaintenance(req.body);
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi lập kế hoạch bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route PUT /api/maintenances/:id
 * @desc Cập nhật kế hoạch bảo trì
 * @access Private (Admin/Manager/Technician)
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedMaintenance = await MaintenanceModel.update(req.params.id, req.body);
    res.json(updatedMaintenance);
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi cập nhật kế hoạch bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route PUT /api/maintenances/:id/status
 * @desc Cập nhật trạng thái bảo trì
 * @access Private (Technician)
 */
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Trạng thái không được để trống' });
    }

    const updatedMaintenance = await MaintenanceModel.updateMaintenanceStatus(
      req.params.id, 
      status
    );
    res.json(updatedMaintenance);
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi cập nhật trạng thái bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route DELETE /api/maintenances/:id
 * @desc Xóa kế hoạch bảo trì
 * @access Private (Admin/Manager)
 */
router.delete('/:id', async (req, res) => {
  try {
    await MaintenanceModel.delete(req.params.id);
    res.json({ message: 'Xóa kế hoạch bảo trì thành công' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi xóa kế hoạch bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/maintenances/history/:equipmentId
 * @desc Lấy lịch sử bảo trì của thiết bị
 * @access Private
 */
router.get('/history/:equipmentId', async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const options = {
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0
    };

    const maintenanceHistory = await MaintenanceModel.getMaintenanceHistory(
      req.params.equipmentId, 
      options
    );
    res.json(maintenanceHistory);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy lịch sử bảo trì', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/maintenances/status-summary
 * @desc Thống kê trạng thái bảo trì
 * @access Private
 */
router.get('/status-summary', async (req, res) => {
  try {
    const summary = await MaintenanceModel.getMaintenanceStatusSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi thống kê trạng thái bảo trì', 
      error: error.message 
    });
  }
});

module.exports = router;
