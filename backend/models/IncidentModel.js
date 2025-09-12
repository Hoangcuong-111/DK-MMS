const BaseModel = require('./BaseModel');
const EquipmentModel = require('./EquipmentModel');

class IncidentModel extends BaseModel {
  constructor() {
    super('incidents');
  }

  /**
   * Báo cáo sự cố mới
   * @param {Object} incidentData - Thông tin sự cố
   * @returns {Promise} Kết quả tạo sự cố
   */
  async reportIncident(incidentData) {
    try {
      // Kiểm tra thiết bị tồn tại
      const equipment = await EquipmentModel.findById(incidentData.equipment_id);
      if (!equipment) {
        throw new Error('Thiết bị không tồn tại');
      }

      // Validate dữ liệu
      this.validateIncidentData(incidentData);

      // Thiết lập trạng thái ban đầu
      incidentData.status = incidentData.status || 'open';
      
      return await this.create(incidentData);
    } catch (error) {
      console.error('Lỗi báo cáo sự cố:', error);
      throw error;
    }
  }

  /**
   * Cập nhật trạng thái sự cố
   * @param {number} incidentId - ID của sự cố
   * @param {Object} updateData - Dữ liệu cập nhật
   * @returns {Promise} Kết quả cập nhật
   */
  async updateIncident(incidentId, updateData) {
    try {
      // Nếu đóng sự cố, bắt buộc phải có chi tiết giải quyết
      if (updateData.status === 'closed' && !updateData.resolution_details) {
        throw new Error('Phải cung cấp chi tiết giải quyết khi đóng sự cố');
      }

      // Nếu có trạng thái mới, validate
      if (updateData.status) {
        this.validateIncidentStatus(updateData.status);
      }

      return await this.update(incidentId, updateData);
    } catch (error) {
      console.error('Lỗi cập nhật sự cố:', error);
      throw error;
    }
  }

  /**
   * Lấy danh sách sự cố theo trạng thái và độ ưu tiên
   * @param {Object} filters - Bộ lọc sự cố
   * @returns {Promise} Danh sách sự cố
   */
  async getFilteredIncidents(filters = {}) {
    try {
      const defaultOptions = {
        orderBy: 'created_at DESC',
        limit: 50
      };

      const queryOptions = { 
        ...defaultOptions, 
        where: filters 
      };

      return await this.findAll(queryOptions);
    } catch (error) {
      console.error('Lỗi lọc sự cố:', error);
      throw error;
    }
  }

  /**
   * Thống kê sự cố
   * @returns {Promise} Thống kê số lượng sự cố theo trạng thái và độ ưu tiên
   */
  async getIncidentSummary() {
    try {
      const [statusSummary] = await this.db.query(`
        SELECT status, 
               COUNT(*) as count, 
               AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_resolution_time
        FROM ${this.tableName}
        GROUP BY status
      `);

      const [prioritySummary] = await this.db.query(`
        SELECT priority, 
               COUNT(*) as count
        FROM ${this.tableName}
        GROUP BY priority
      `);

      return {
        byStatus: statusSummary,
        byPriority: prioritySummary
      };
    } catch (error) {
      console.error('Lỗi thống kê sự cố:', error);
      throw error;
    }
  }

  /**
   * Validate dữ liệu sự cố
   * @param {Object} data - Dữ liệu sự cố
   * @throws {Error} Nếu dữ liệu không hợp lệ
   */
  validateIncidentData(data) {
    const requiredFields = ['equipment_id', 'title', 'reported_by'];
    
    // Kiểm tra các trường bắt buộc
    requiredFields.forEach(field => {
      if (!data[field]) {
        throw new Error(`Thiếu trường bắt buộc: ${field}`);
      }
    });

    // Validate độ ưu tiên
    this.validateIncidentPriority(data.priority);
  }

  /**
   * Validate trạng thái sự cố
   * @param {string} status - Trạng thái sự cố
   * @throws {Error} Nếu trạng thái không hợp lệ
   */
  validateIncidentStatus(status) {
    const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Trạng thái sự cố không hợp lệ');
    }
  }

  /**
   * Validate độ ưu tiên sự cố
   * @param {string} priority - Độ ưu tiên
   * @throws {Error} Nếu độ ưu tiên không hợp lệ
   */
  validateIncidentPriority(priority) {
    const validPriorities = ['low', 'medium', 'high', 'critical'];
    if (priority && !validPriorities.includes(priority)) {
      throw new Error('Độ ưu tiên sự cố không hợp lệ');
    }
  }
}

module.exports = new IncidentModel();
