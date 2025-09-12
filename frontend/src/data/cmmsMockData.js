// Comprehensive mock data for CMMS system
export const equipmentData = [
  {
    id: 'EQ001',
    name: 'Máy nén khí Atlas Copco',
    type: 'Máy nén khí',
    category: 'Thiết bị khí nén',
    location: 'Sản xuất',
    area: 'Workshop A - Line 1',
    status: 'active',
    criticality: 5,
    manufacturer: 'Atlas Copco',
    model: 'GA 75 VSD',
    serialNumber: 'AC123456789',
    installationYear: 2020,
    technicalSpecs: {
      power: '75 kW',
      pressure: '8 bar',
      flowRate: '12.5 m³/min',
      voltage: '380V',
      weight: '1200 kg'
    },
    documents: [
      { id: 'DOC001', name: 'Manual vận hành', type: 'PDF', size: '2.5 MB' },
      { id: 'DOC002', name: 'P&ID Drawing', type: 'DWG', size: '1.8 MB' }
    ],
    lastMaintenance: '2024-08-15',
    nextMaintenance: '2024-09-15',
    createdAt: '2024-01-15'
  },
  {
    id: 'EQ002',
    name: 'Băng tải chính A1',
    type: 'Băng tải',
    category: 'Thiết bị vận chuyển',
    location: 'Đóng gói',
    area: 'Packaging Line A',
    status: 'maintenance',
    criticality: 4,
    manufacturer: 'Siemens',
    model: 'CONV-2000',
    serialNumber: 'SI987654321',
    installationYear: 2019,
    technicalSpecs: {
      length: '50 m',
      width: '800 mm',
      speed: '1.2 m/s',
      capacity: '500 kg/m',
      motor: '7.5 kW'
    },
    documents: [
      { id: 'DOC003', name: 'Maintenance Guide', type: 'PDF', size: '3.2 MB' }
    ],
    lastMaintenance: '2024-09-01',
    nextMaintenance: '2024-10-01',
    createdAt: '2024-01-20'
  },
  {
    id: 'EQ003',
    name: 'Máy bơm nước làm mát',
    type: 'Máy bơm',
    category: 'Thiết bị làm mát',
    location: 'Tiện ích',
    area: 'Cooling Tower',
    status: 'active',
    criticality: 3,
    manufacturer: 'Grundfos',
    model: 'CR-150',
    serialNumber: 'GR456789123',
    installationYear: 2021,
    technicalSpecs: {
      flow: '150 m³/h',
      head: '45 m',
      power: '15 kW',
      efficiency: '85%',
      temperature: '0-80°C'
    },
    documents: [],
    lastMaintenance: '2024-08-20',
    nextMaintenance: '2024-11-20',
    createdAt: '2024-02-10'
  }
];

export const workOrderData = [
  {
    id: 'WO001',
    equipmentId: 'EQ001',
    equipmentName: 'Máy nén khí Atlas Copco',
    title: 'Bảo trì định kỳ máy nén khí',
    description: 'Thực hiện bảo trì định kỳ theo checklist: thay dầu, kiểm tra belt, làm sạch filter',
    type: 'preventive',
    priority: 'medium',
    status: 'in_progress',
    scheduledStart: '2024-09-10T08:00:00',
    scheduledEnd: '2024-09-10T16:00:00',
    actualStart: '2024-09-10T08:30:00',
    actualEnd: null,
    assignedTo: 'USER002',
    assignedName: 'Nguyễn Văn Bình',
    createdBy: 'USER001',
    createdName: 'Trần Thị An',
    estimatedHours: 8,
    actualHours: 6.5,
    checklist: [
      { id: 1, task: 'Tắt nguồn điện', completed: true },
      { id: 2, task: 'Xả áp suất', completed: true },
      { id: 3, task: 'Thay dầu máy nén', completed: false },
      { id: 4, task: 'Kiểm tra belt', completed: false },
      { id: 5, task: 'Test vận hành', completed: false }
    ],
    parts: [
      { partId: 'SKU002', name: 'Dầu Shell Rotella 15W40', quantity: 20, unit: 'lít' },
      { partId: 'SKU003', name: 'Lọc khí P123456', quantity: 1, unit: 'cái' }
    ],
    createdAt: '2024-09-08'
  },
  {
    id: 'WO002',
    equipmentId: 'EQ002',
    equipmentName: 'Băng tải chính A1',
    title: 'Thay thế motor băng tải',
    description: 'Motor bị cháy, cần thay thế motor mới và kiểm tra hệ thống điện',
    type: 'corrective',
    priority: 'high',
    status: 'pending',
    scheduledStart: '2024-09-12T07:00:00',
    scheduledEnd: '2024-09-12T15:00:00',
    actualStart: null,
    actualEnd: null,
    assignedTo: 'USER003',
    assignedName: 'Lê Văn Cường',
    createdBy: 'USER001',
    createdName: 'Trần Thị An',
    estimatedHours: 8,
    actualHours: 0,
    checklist: [
      { id: 1, task: 'Chuẩn bị motor mới', completed: false },
      { id: 2, task: 'Tháo motor cũ', completed: false },
      { id: 3, task: 'Lắp motor mới', completed: false },
      { id: 4, task: 'Kiểm tra hệ thống điện', completed: false },
      { id: 5, task: 'Test vận hành', completed: false }
    ],
    parts: [
      { partId: 'SKU005', name: 'Motor Siemens 7.5kW', quantity: 1, unit: 'cái' }
    ],
    createdAt: '2024-09-09'
  }
];

export const incidentData = [
  {
    id: 'INC001',
    equipmentId: 'EQ001',
    equipmentName: 'Máy nén khí Atlas Copco',
    title: 'Máy nén khí dừng đột ngột',
    description: 'Máy nén khí dừng hoạt động đột ngột lúc 14:30, có tiếng kêu bất thường trước khi dừng',
    category: 'mechanical',
    severity: 'high',
    status: 'investigating',
    occurredAt: '2024-09-09T14:30:00',
    reportedBy: 'USER004',
    reportedName: 'Phạm Văn Đức',
    assignedTo: 'USER002',
    assignedName: 'Nguyễn Văn Bình',
    impact: 'Dừng sản xuất Line 1, ảnh hưởng 50% công suất',
    actions: 'Đã chuyển sang máy nén dự phòng, đang kiểm tra nguyên nhân',
    attachments: [
      { id: 'ATT001', name: 'video_su_co.mp4', type: 'video', size: '15.2 MB' },
      { id: 'ATT002', name: 'anh_thiet_bi.jpg', type: 'image', size: '2.1 MB' }
    ],
    resolutionNotes: null,
    resolvedAt: null,
    createdAt: '2024-09-09T14:35:00'
  },
  {
    id: 'INC002',
    equipmentId: 'EQ003',
    equipmentName: 'Máy bơm nước làm mát',
    title: 'Rò rỉ nước tại đường ống',
    description: 'Phát hiện rò rỉ nước tại joint đường ống sau máy bơm',
    category: 'mechanical',
    severity: 'medium',
    status: 'resolved',
    occurredAt: '2024-09-08T10:15:00',
    reportedBy: 'USER005',
    reportedName: 'Hoàng Thị Linh',
    assignedTo: 'USER003',
    assignedName: 'Lê Văn Cường',
    impact: 'Giảm áp suất nước làm mát 10%',
    actions: 'Đã thay thế gasket và siết chặt bolt',
    attachments: [],
    resolutionNotes: 'Đã thay gasket mới và kiểm tra toàn bộ hệ thống. Không còn rò rỉ.',
    resolvedAt: '2024-09-08T16:30:00',
    createdAt: '2024-09-08T10:20:00'
  }
];

export const inventoryData = [
  {
    id: 'SKU001',
    name: 'Vòng bi SKF 6205',
    category: 'Cơ khí',
    subcategory: 'Vòng bi',
    unit: 'cái',
    unitPrice: 150000,
    currentStock: 2,
    minStockLevel: 5,
    maxStockLevel: 50,
    supplier: 'SKF Vietnam',
    status: 'active',
    location: 'Kho A - Kệ A1-01',
    equipmentUsage: ['EQ001', 'EQ003'],
    specifications: {
      innerDiameter: '25mm',
      outerDiameter: '52mm',
      width: '15mm',
      material: 'Chrome Steel'
    },
    lastUpdated: '2024-09-08'
  },
  {
    id: 'SKU002',
    name: 'Dầu Shell Rotella 15W40',
    category: 'Hóa chất',
    subcategory: 'Dầu nhớt',
    unit: 'lít',
    unitPrice: 80000,
    currentStock: 5,
    minStockLevel: 20,
    maxStockLevel: 100,
    supplier: 'Shell Vietnam',
    status: 'active',
    location: 'Kho B - Tank B1',
    equipmentUsage: ['EQ001', 'EQ002'],
    specifications: {
      viscosity: '15W40',
      type: 'Synthetic',
      capacity: '20L/drum'
    },
    lastUpdated: '2024-09-07'
  },
  {
    id: 'SKU003',
    name: 'Lọc khí P123456',
    category: 'Phụ tùng',
    subcategory: 'Bộ lọc',
    unit: 'cái',
    unitPrice: 250000,
    currentStock: 1,
    minStockLevel: 3,
    maxStockLevel: 20,
    supplier: 'Atlas Copco',
    status: 'active',
    location: 'Kho A - Kệ A2-05',
    equipmentUsage: ['EQ001'],
    specifications: {
      filterType: 'Air Filter',
      efficiency: '99.97%',
      maxFlow: '15 m³/min'
    },
    lastUpdated: '2024-09-06'
  },
  {
    id: 'SKU004',
    name: 'Belt V-1200',
    category: 'Cơ khí',
    subcategory: 'Dây đai',
    unit: 'cái',
    unitPrice: 180000,
    currentStock: 8,
    minStockLevel: 5,
    maxStockLevel: 25,
    supplier: 'Gates Vietnam',
    status: 'active',
    location: 'Kho A - Kệ A1-10',
    equipmentUsage: ['EQ001', 'EQ002'],
    specifications: {
      length: '1200mm',
      width: '13mm',
      type: 'V-Belt'
    },
    lastUpdated: '2024-09-05'
  },
  {
    id: 'SKU005',
    name: 'Motor Siemens 7.5kW',
    category: 'Điện',
    subcategory: 'Motor',
    unit: 'cái',
    unitPrice: 15000000,
    currentStock: 0,
    minStockLevel: 1,
    maxStockLevel: 3,
    supplier: 'Siemens Vietnam',
    status: 'active',
    location: 'Kho C - Kệ C1-01',
    equipmentUsage: ['EQ002'],
    specifications: {
      power: '7.5kW',
      voltage: '380V',
      rpm: '1450',
      efficiency: 'IE3'
    },
    lastUpdated: '2024-09-04'
  }
];

export const maintenanceScheduleData = [
  {
    id: 'SCH001',
    equipmentId: 'EQ001',
    equipmentName: 'Máy nén khí Atlas Copco',
    scheduleName: 'Bảo trì định kỳ hàng tháng',
    frequencyType: 'monthly',
    frequencyValue: 1,
    nextDueDate: '2024-09-15',
    lastCompleted: '2024-08-15',
    isActive: true,
    taskTemplate: {
      estimatedHours: 8,
      checklist: [
        'Kiểm tra mức dầu',
        'Thay filter khí',
        'Kiểm tra belt',
        'Làm sạch cooler',
        'Test safety valve'
      ],
      requiredParts: ['SKU002', 'SKU003']
    },
    createdAt: '2024-01-15'
  },
  {
    id: 'SCH002',
    equipmentId: 'EQ002',
    equipmentName: 'Băng tải chính A1',
    scheduleName: 'Kiểm tra hàng tuần',
    frequencyType: 'weekly',
    frequencyValue: 1,
    nextDueDate: '2024-09-16',
    lastCompleted: '2024-09-09',
    isActive: true,
    taskTemplate: {
      estimatedHours: 2,
      checklist: [
        'Kiểm tra belt alignment',
        'Bôi trơn bearing',
        'Kiểm tra motor',
        'Làm sạch băng tải'
      ],
      requiredParts: ['SKU004']
    },
    createdAt: '2024-02-01'
  },
  {
    id: 'SCH003',
    equipmentId: 'EQ003',
    equipmentName: 'Máy bơm nước làm mát',
    scheduleName: 'Bảo trì định kỳ 3 tháng',
    frequencyType: 'quarterly',
    frequencyValue: 1,
    nextDueDate: '2024-11-20',
    lastCompleted: '2024-08-20',
    isActive: true,
    taskTemplate: {
      estimatedHours: 6,
      checklist: [
        'Kiểm tra impeller',
        'Thay mechanical seal',
        'Kiểm tra coupling',
        'Test performance'
      ],
      requiredParts: ['SKU001']
    },
    createdAt: '2024-02-10'
  }
];

export const userData = [
  {
    id: 'USER001',
    username: 'admin',
    email: 'admin@company.com',
    fullName: 'Trần Thị An',
    phone: '0901234567',
    department: 'IT',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-09-09T08:00:00',
    createdAt: '2024-01-01'
  },
  {
    id: 'USER002',
    username: 'technician1',
    email: 'binh.nguyen@company.com',
    fullName: 'Nguyễn Văn Bình',
    phone: '0901234568',
    department: 'Bảo trì',
    role: 'technician',
    status: 'active',
    lastLogin: '2024-09-09T07:30:00',
    createdAt: '2024-01-15'
  },
  {
    id: 'USER003',
    username: 'engineer1',
    email: 'cuong.le@company.com',
    fullName: 'Lê Văn Cường',
    phone: '0901234569',
    department: 'Kỹ thuật',
    role: 'engineer',
    status: 'active',
    lastLogin: '2024-09-09T08:15:00',
    createdAt: '2024-01-20'
  },
  {
    id: 'USER004',
    username: 'operator1',
    email: 'duc.pham@company.com',
    fullName: 'Phạm Văn Đức',
    phone: '0901234570',
    department: 'Sản xuất',
    role: 'operator',
    status: 'active',
    lastLogin: '2024-09-09T06:00:00',
    createdAt: '2024-02-01'
  },
  {
    id: 'USER005',
    username: 'manager1',
    email: 'linh.hoang@company.com',
    fullName: 'Hoàng Thị Linh',
    phone: '0901234571',
    department: 'Quản lý',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-09-09T08:30:00',
    createdAt: '2024-02-05'
  }
];

export const transactionData = [
  {
    id: 'TXN001',
    partId: 'SKU002',
    partName: 'Dầu Shell Rotella 15W40',
    transactionType: 'out',
    quantity: 20,
    referenceId: 'WO001',
    referenceType: 'work_order',
    transactionDate: '2024-09-10T09:00:00',
    performedBy: 'USER002',
    performedName: 'Nguyễn Văn Bình',
    notes: 'Xuất kho cho bảo trì máy nén khí',
    unitPrice: 80000,
    totalValue: 1600000
  },
  {
    id: 'TXN002',
    partId: 'SKU001',
    partName: 'Vòng bi SKF 6205',
    transactionType: 'in',
    quantity: 10,
    referenceId: 'PO001',
    referenceType: 'purchase_order',
    transactionDate: '2024-09-08T14:00:00',
    performedBy: 'USER005',
    performedName: 'Hoàng Thị Linh',
    notes: 'Nhập kho từ đơn hàng PO001',
    unitPrice: 150000,
    totalValue: 1500000
  }
];

// Status mappings and constants
export const STATUS_LABELS = {
  equipment: {
    active: { label: 'Hoạt động', color: 'green' },
    maintenance: { label: 'Bảo trì', color: 'yellow' },
    stopped: { label: 'Dừng', color: 'red' },
    retired: { label: 'Thanh lý', color: 'gray' }
  },
  workOrder: {
    pending: { label: 'Chờ thực hiện', color: 'blue' },
    in_progress: { label: 'Đang thực hiện', color: 'yellow' },
    completed: { label: 'Hoàn thành', color: 'green' },
    cancelled: { label: 'Hủy bỏ', color: 'red' }
  },
  incident: {
    new: { label: 'Mới', color: 'blue' },
    investigating: { label: 'Đang phân tích', color: 'yellow' },
    in_progress: { label: 'Đang xử lý', color: 'orange' },
    resolved: { label: 'Đã giải quyết', color: 'green' },
    closed: { label: 'Đã đóng', color: 'gray' }
  },
  priority: {
    low: { label: 'Thấp', color: 'green' },
    medium: { label: 'Trung bình', color: 'yellow' },
    high: { label: 'Cao', color: 'orange' },
    critical: { label: 'Khẩn cấp', color: 'red' }
  },
  severity: {
    low: { label: 'Thấp', color: 'green' },
    medium: { label: 'Trung bình', color: 'yellow' },
    high: { label: 'Cao', color: 'orange' },
    critical: { label: 'Nghiêm trọng', color: 'red' }
  }
};

export const EQUIPMENT_TYPES = [
  'Máy nén khí', 'Băng tải', 'Máy bơm', 'Motor điện', 'Máy cắt', 'Máy hàn',
  'Cần cẩu', 'Máy phát điện', 'Biến áp', 'Tủ điện', 'Hệ thống HVAC'
];

export const LOCATIONS = [
  'Sản xuất', 'Đóng gói', 'Kho nguyên liệu', 'Kho thành phẩm', 'Tiện ích',
  'Văn phòng', 'Bảo vệ', 'Xử lý nước thải', 'Trạm điện'
];

export const INCIDENT_CATEGORIES = [
  'mechanical', 'electrical', 'automation', 'calibration', 'safety', 'other'
];

export const PART_CATEGORIES = [
  'Cơ khí', 'Điện', 'Hóa chất', 'Phụ tùng', 'Dụng cụ', 'An toàn'
];