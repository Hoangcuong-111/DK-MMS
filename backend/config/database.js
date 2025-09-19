require('dotenv').config();               // đọc file .env

const mysql = require('mysql2');  // cần require mysql2

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+07:00', // múi giờ VN
});

// test kết nối khi start app (tuỳ chọn)
promisePool.getConnection()
  .then(conn => {
    console.log('MySQL pool connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('MySQL pool connection failed:', err.message);
    process.exit(1);
  });

module.exports = pool;
