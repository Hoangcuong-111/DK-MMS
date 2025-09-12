const BaseModel = require('./BaseModel');

class EquipmentModel extends BaseModel {
  constructor() {
    super('equipments');
  }

  /**
   * Tìm thiết bị theo mã hoặc tên
   * @param {string} query - Từ khóa tìm kiếm
   * @returns {Promise} Danh sách thiết bị
   */
  async searchEquipment(query) {
    try {
      const [rows] = await this.db.query(
        `SELECT * FROM ${this.tableName} 
         WHERE code LIKE ? OR name LIKE ? OR location LIKE ?`, 
        [`%${query}%`, `%${query}%`, `%${query}%`]
      );
      return rows;
    } catch (error) {
      console.error('Lỗi tìm kiếm thiết bị:', error);
      throw error;
    }
  }

  /**
   * Lấy thiết bị theo trạng thái
   * @param {string} status - Trạng thái thiết bị
   * @returns {Promise} Danh sách thiết bị theo trạng thái
   */
  async getEquipmentByStatus(status) {
    try {
      const [rows] = await this.db.query(
        `SELECT * FROM ${this.tableName} WHERE status = ?`, 
        [status]
      );
      return rows;
    } catch (error) {
      console.error('Lỗi lấy thiết bị theo trạng thái:', error);
      throw error;
    }
  }

  /**
   * Thống kê số lượng thiết bị theo từng trạng thái
   * @returns {Promise} Thống kê số lượng thiết bị
   */
  async getEquipmentStatusSummary() {
    try {
      const [rows] = await this.db.query(`
        SELECT status, COUNT(*) as count 
        FROM ${this.tableName} 
        GROUP BY status
      `);
      return rows;
    } catch (error) {
      console.error('Lỗi thống kê trạng thái thiết bị:', error);
      throw error;
    }
  }
}

module.exports = new EquipmentModel();
