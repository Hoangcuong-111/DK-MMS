const BaseModel = require('./BaseModel');

class InventoryModel extends BaseModel {
  constructor() {
    super('inventory');
  }

  /**
   * Tìm phụ tùng theo mã hoặc tên
   * @param {string} query - Từ khóa tìm kiếm
   * @returns {Promise} Danh sách phụ tùng
   */
  async searchInventory(query) {
    try {
      const [rows] = await this.db.query(
        `SELECT * FROM ${this.tableName} 
         WHERE code LIKE ? OR name LIKE ? OR category LIKE ?`, 
        [`%${query}%`, `%${query}%`, `%${query}%`]
      );
      return rows;
    } catch (error) {
      console.error('Lỗi tìm kiếm phụ tùng:', error);
      throw error;
    }
  }

  /**
   * Lấy phụ tùng theo trạng thái tồn kho
   * @param {string} status - Trạng thái tồn kho (low, normal, high)
   * @returns {Promise} Danh sách phụ tùng theo trạng thái
   */
  async getInventoryByStatus(status) {
    try {
      const [rows] = await this.db.query(
        `SELECT * FROM ${this.tableName} WHERE stock_status = ?`, 
        [status]
      );
      return rows;
    } catch (error) {
      console.error('Lỗi lấy phụ tùng theo trạng thái:', error);
      throw error;
    }
  }

  /**
   * Thống kê số lượng phụ tùng theo trạng thái tồn kho
   * @returns {Promise} Thống kê số lượng phụ tùng
   */
  async getInventoryStatusSummary() {
    try {
      const [rows] = await this.db.query(`
        SELECT stock_status, COUNT(*) as count 
        FROM ${this.tableName} 
        GROUP BY stock_status
      `);
      return rows;
    } catch (error) {
      console.error('Lỗi thống kê trạng thái tồn kho:', error);
      throw error;
    }
  }
}

module.exports = new InventoryModel();