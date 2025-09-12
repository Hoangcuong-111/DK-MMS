-- Create database if not exists
CREATE DATABASE IF NOT EXISTS dk_mms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dk_mms;

-- Drop tables in reverse order to handle FK constraints
DROP TABLE IF EXISTS maintenances;
DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS equipments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS inventory;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('admin', 'manager', 'engineer', 'technician') DEFAULT 'technician',
  department VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create equipments table
CREATE TABLE equipments (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  manufacturer VARCHAR(100),
  model VARCHAR(50),
  serialNumber VARCHAR(20),
  installationYear INT,
  criticality INT DEFAULT 3,
  status ENUM('active', 'maintenance', 'stopped', 'retired') DEFAULT 'active',
  technicalSpecs JSON,
  nextMaintenance DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create incidents table
CREATE TABLE incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  incident_id VARCHAR(10) NOT NULL,
  equipment_id VARCHAR(10),
  category ENUM('electrical', 'mechanical', 'automation', 'calibration', 'other') DEFAULT 'other',
  severity ENUM('low', 'medium', 'high', 'emergency') DEFAULT 'medium',
  description TEXT,
  occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reported_by INT,
  status ENUM('new', 'analyzing', 'processing', 'closed') DEFAULT 'new',
  FOREIGN KEY (equipment_id) REFERENCES equipments(id) ON DELETE SET NULL,
  FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenances table
CREATE TABLE maintenances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wo_id VARCHAR(10) NOT NULL,
  equipment_id VARCHAR(10),
  title VARCHAR(100),
  description TEXT,
  priority ENUM('low', 'medium', 'high', 'emergency') DEFAULT 'medium',
  status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  scheduled_date DATE,
  completed_date DATE,
  assigned_to INT,
  FOREIGN KEY (equipment_id) REFERENCES equipments(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory table
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  quantity INT DEFAULT 0,
  min_stock INT DEFAULT 0,
  unit VARCHAR(10),
  supplier VARCHAR(100),
  stock_status ENUM('low', 'normal', 'high') DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for users
INSERT INTO users (username, email, password, full_name, role, department) VALUES
('admin', 'admin@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin', 'IT'),
('manager', 'manager@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Manager User', 'manager', 'Maintenance');

-- Sample data for equipments
INSERT INTO equipments (id, name, type, location, manufacturer, model, serialNumber, installationYear, criticality, status, technicalSpecs, nextMaintenance) VALUES
('EQ001', 'Máy nén khí Atlas Copco', 'Máy nén', 'Sản xuất', 'Atlas Copco', 'GA 75 VSD', 'AC123456789', 2020, 5, 'active', '{"power": "75 kW", "pressure": "8 bar"}', '2024-10-01'),
('EQ002', 'Băng tải A1', 'Vận chuyển', 'Đóng gói', 'Siemens', 'Belt A1', 'BT789', 2018, 4, 'maintenance', '{"speed": "2 m/s", "length": "10 m"}', '2024-09-15'),
('EQ003', 'Motor điện 5kW', 'Động lực', 'Workshop B', 'ABB', 'M2BAX', 'MOT456', 2019, 3, 'stopped', '{"power": "5 kW", "voltage": "380V"}', '2024-11-20');

-- Sample data for incidents
INSERT INTO incidents (incident_id, equipment_id, category, severity, description, reported_by) VALUES
('INC001', 'EQ001', 'mechanical', 'high', 'Máy nén dừng đột ngột', 1),
('INC002', 'EQ002', 'electrical', 'medium', 'Băng tải báo lỗi motor', 2);

-- Sample data for maintenances
INSERT INTO maintenances (wo_id, equipment_id, title, description, priority, assigned_to) VALUES
('WO001', 'EQ001', 'Bảo trì định kỳ', 'Thay dầu máy nén', 'medium', 2),
('WO002', 'EQ003', 'Khắc phục sự cố', 'Sửa motor điện', 'high', 1);

-- Sample data for inventory
INSERT INTO inventory (code, name, category, quantity, min_stock, unit, supplier, stock_status) VALUES
('INV001', 'Dầu bôi trơn', 'Lubricants', 50, 10, 'liter', 'Shell', 'normal'),
('INV002', 'Bánh răng', 'Mechanical Parts', 5, 20, 'pcs', 'Local Supplier', 'low'),
('INV003', 'Pin dự phòng', 'Electrical', 100, 50, 'pcs', 'Duracell', 'high');
