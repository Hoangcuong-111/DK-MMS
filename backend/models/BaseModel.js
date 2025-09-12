const { promisePool } = require('../config/database');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = promisePool;
  }

  /**
   * Lấy tất cả bản ghi
   * @param {Object} options - Các tùy chọn truy vấn
   * @returns {Promise} Danh sách bản ghi
   */
  async findAll(options = {}) {
    const { 
      select = '*', 
      where = {}, 
      orderBy = 'id', 
      limit = 100, 
      offset = 0 
    } = options;

    let query = `SELECT ${select} FROM ${this.tableName}`;
    const whereConditions = [];
    const values = [];

    // Xây dựng điều kiện WHERE
    Object.entries(where).forEach(([key, value]) => {
      whereConditions.push(`${key} = ?`);
      values.push(value);
    });

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    query += ` ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
    values.push(limit, offset);

    try {
      const [rows] = await this.db.query(query, values);
      return rows;
    } catch (error) {
      console.error(`Lỗi truy vấn findAll cho ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Tìm bản ghi theo ID
   * @param {number} id - ID của bản ghi
   * @returns {Promise} Bản ghi tìm thấy
   */
  async findById(id) {
    try {
      const [rows] = await this.db.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`, 
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error(`Lỗi truy vấn findById cho ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Tạo bản ghi mới
   * @param {Object} data - Dữ liệu bản ghi
   * @returns {Promise} Kết quả thêm mới
   */
  async create(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    try {
      const [result] = await this.db.query(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`, 
        values
      );
      return result;
    } catch (error) {
      console.error(`Lỗi tạo bản ghi cho ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Cập nhật bản ghi
   * @param {number} id - ID bản ghi
   * @param {Object} data - Dữ liệu cập nhật
   * @returns {Promise} Kết quả cập nhật
   */
  async update(id, data) {
    const setConditions = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    try {
      const [result] = await this.db.query(
        `UPDATE ${this.tableName} SET ${setConditions} WHERE id = ?`, 
        values
      );
      return result;
    } catch (error) {
      console.error(`Lỗi cập nhật bản ghi cho ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Xóa bản ghi
   * @param {number} id - ID bản ghi
   * @returns {Promise} Kết quả xóa
   */
  async delete(id) {
    try {
      const [result] = await this.db.query(
        `DELETE FROM ${this.tableName} WHERE id = ?`, 
        [id]
      );
      return result;
    } catch (error) {
      console.error(`Lỗi xóa bản ghi cho ${this.tableName}:`, error);
      throw error;
    }
  }
}

module.exports = BaseModel;
