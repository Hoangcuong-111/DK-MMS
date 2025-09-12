-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS cmms_dashboard;
USE cmms_dashboard;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'manager', 'technician', 'viewer') DEFAULT 'viewer',
    department VARCHAR(100),
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng thiết bị
CREATE TABLE IF NOT EXISTS equipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    category VARCHAR(50),
    manufacturer VARCHAR(100),
    model_number VARCHAR(50),
    serial_number VARCHAR(50),
    purchase_date DATE,
    installation_date DATE,
    status ENUM('operational', 'maintenance', 'repair', 'inactive') DEFAULT 'operational',
    criticality ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng bảo trì
CREATE TABLE IF NOT EXISTS maintenances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT NOT NULL,
    type ENUM('preventive', 'corrective', 'predictive') NOT NULL,
    description TEXT,
    scheduled_date DATE,
    actual_start_date DATETIME,
    actual_end_date DATETIME,
    status ENUM('planned', 'in_progress', 'completed', 'cancelled') DEFAULT 'planned',
    technician_id INT,
    estimated_duration INT COMMENT 'Thời gian dự kiến (phút)',
    actual_duration INT COMMENT 'Thời gian thực tế (phút)',
    cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (equipment_id) REFERENCES equipments(id),
    FOREIGN KEY (technician_id) REFERENCES users(id)
);

-- Bảng sự cố
CREATE TABLE IF NOT EXISTS incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reported_by INT,
    assigned_to INT,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    root_cause TEXT,
    resolution_details TEXT,
    downtime_start DATETIME,
    downtime_end DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (equipment_id) REFERENCES equipments(id),
    FOREIGN KEY (reported_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Chỉ mục để tối ưu hiệu suất
CREATE INDEX idx_equipment_status ON equipments(status);
CREATE INDEX idx_maintenance_status ON maintenances(status);
CREATE INDEX idx_incident_status ON incidents(status);
CREATE INDEX idx_incident_priority ON incidents(priority);
