const BaseModel = require('./BaseModel');
const EquipmentModel = require('./EquipmentModel');

class MaintenanceModel extends BaseModel {
  constructor() {
    super('maintenances');
  }

  /**
   * Lập kế hoạch bảo trì cho thiết bị
   * @param {Object} maintenanceData - Thông tin bảo trì
   * @returns {Promise} Kết quả tạo kế hoạch bảo trì
   */
  async scheduleMaintenance(maintenanceData) {
    try {
      // Kiểm tra thiết bị tồn tại
      const equipment = await EquipmentModel.findById(maintenanceData.equipment_id);
      if (!equipment) {
        throw new Error('Thiết bị không tồn tại');
      }

      // Validate dữ liệu
      this.validateMaintenanceData(maintenanceData);

      return await this.create(maintenanceData);
    } catch (error) {
      console.error('Lỗi lập kế hoạch bảo trì:', error);
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái bảo trì
   * @param {number} maintenanceId - ID của kế hoạch bảo trì
   * @param {string} status - Trạng thái mới
   * @returns {Promise} Kết quả cập nhật
   */
  async updateMaintenanceStatus(maintenanceId, status) {
    try {
      return await this.update(maintenanceId, { status });
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái bảo trì:', error);
      throw error;
    }
  }

  /**
   * Lấy lịch sử bảo trì của một thiết bị
   * @param {number} equipmentId - ID của thiết bị
   * @param {Object} options - Tùy chọn truy vấn
   * @returns {Promise} Danh sách lịch sử bảo trì
   */
  async getMaintenanceHistory(equipmentId, options = {}) {
    try {
      const defaultOptions = {
        where: { equipment_id: equipmentId },
        orderBy: 'scheduled_date DESC',
        limit: 50
      };

      const queryOptions = { ...defaultOptions, ...options };
      return await this.findAll(queryOptions);
    } catch (error) {
      console.error('Lỗi lấy lịch sử bảo trì:', error);
      throw error;
    }
  }

  /**
   * Thống kê bảo trì
   * @returns {Promise} Thống kê số lượng bảo trì theo trạng thái
   */
  async getMaintenanceStatusSummary() {
    try {
      const [rows] = await this.db.query(`
        SELECT status, 
               COUNT(*) as count, 
               AVG(TIMESTAMPDIFF(HOUR, scheduled_date, actual_end_date)) as avg_duration
        FROM ${this.tableName}
        GROUP BY status
      `);
      return rows;
    } catch (error) {
      console.error('Lỗi thống kê trạng thái bảo trì:', error);
      throw error;
    }
  }

  /**
   * Validate dữ liệu bảo trì
   * @param {Object} data - Dữ liệu bảo trì
   * @throws {Error} Nếu dữ liệu không hợp lệ
   */
  validateMaintenanceData(data) {
    const requiredFields = ['equipment_id', 'type', 'scheduled_date'];
    
    // Kiểm tra các trường bắt buộc
    requiredFields.forEach(field => {
      if (!data[field]) {
        throw new Error(`Thiếu trường bắt buộc: ${field}`);
      }
    });

    // Kiểm tra ngày
    if (new Date(data.scheduled_date) < new Date()) {
      throw new Error('Ngày lập kế hoạch không được nhỏ hơn ngày hiện tại');
    }

    // Kiểm tra loại bảo trì
    const validTypes = ['preventive', 'corrective', 'predictive'];
    if (!validTypes.includes(data.type)) {
      throw new Error('Loại bảo trì không hợp lệ');
    }
  }
}

module.exports = new MaintenanceModel();
