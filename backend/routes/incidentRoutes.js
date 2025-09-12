const express = require('express');
const router = express.Router();
const IncidentModel = require('../models/IncidentModel');

/**
 * @route GET /api/incidents
 * @desc Lấy danh sách sự cố
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    const { status, priority, equipment_id, limit, offset } = req.query;
    const options = {
      where: {},
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0
    };

    if (status) options.where.status = status;
    if (priority) options.where.priority = priority;
    if (equipment_id) options.where.equipment_id = equipment_id;

    const incidents = await IncidentModel.findAll(options);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy danh sách sự cố', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/incidents/:id
 * @desc Lấy chi tiết sự cố
 * @access Private
 */
router.get('/:id', async (req, res) => {
  try {
    const incident = await IncidentModel.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Không tìm thấy sự cố' });
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi lấy chi tiết sự cố', 
      error: error.message 
    });
  }
});

/**
 * @route POST /api/incidents
 * @desc Báo cáo sự cố mới
 * @access Private (All users)
 */
router.post('/', async (req, res) => {
  try {
    const newIncident = await IncidentModel.reportIncident(req.body);
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi báo cáo sự cố', 
      error: error.message 
    });
  }
});

/**
 * @route PUT /api/incidents/:id
 * @desc Cập nhật sự cố
 * @access Private (Admin/Manager/Technician)
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedIncident = await IncidentModel.updateIncident(req.params.id, req.body);
    res.json(updatedIncident);
  } catch (error) {
    res.status(400).json({ 
      message: 'Lỗi cập nhật sự cố', 
      error: error.message 
    });
  }
});

/**
 * @route DELETE /api/incidents/:id
 * @desc Xóa sự cố
 * @access Private (Admin/Manager)
 */
router.delete('/:id', async (req, res) => {
  try {
    await IncidentModel.delete(req.params.id);
    res.json({ message: 'Xóa sự cố thành công' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi xóa sự cố', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/incidents/search
 * @desc Tìm kiếm sự cố
 * @access Private
 */
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm' });
    }

    const filters = {
      title: query,
      description: query
    };

    const results = await IncidentModel.getFilteredIncidents(filters);
    res.json(results);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi tìm kiếm sự cố', 
      error: error.message 
    });
  }
});

/**
 * @route GET /api/incidents/summary
 * @desc Thống kê sự cố
 * @access Private
 */
router.get('/summary', async (req, res) => {
  try {
    const summary = await IncidentModel.getIncidentSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi thống kê sự cố', 
      error: error.message 
    });
  }
});

module.exports = router;
