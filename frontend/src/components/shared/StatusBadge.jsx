import React from 'react';

const StatusBadge = ({ status, type = 'default', size = 'sm' }) => {
  const getStatusConfig = () => {
    const configs = {
      equipment: {
        active: { label: 'Hoạt động', color: 'green', icon: '●' },
        maintenance: { label: 'Bảo trì', color: 'yellow', icon: '◐' },
        stopped: { label: 'Dừng', color: 'red', icon: '●' },
        retired: { label: 'Thanh lý', color: 'gray', icon: '○' }
      },
      workOrder: {
        pending: { label: 'Chờ thực hiện', color: 'blue', icon: '◯' },
        in_progress: { label: 'Đang thực hiện', color: 'yellow', icon: '◐' },
        completed: { label: 'Hoàn thành', color: 'green', icon: '●' },
        cancelled: { label: 'Hủy bỏ', color: 'red', icon: '✕' }
      },
      incident: {
        new: { label: 'Mới', color: 'blue', icon: '!' },
        investigating: { label: 'Đang phân tích', color: 'yellow', icon: '?' },
        in_progress: { label: 'Đang xử lý', color: 'orange', icon: '◐' },
        resolved: { label: 'Đã giải quyết', color: 'green', icon: '✓' },
        closed: { label: 'Đã đóng', color: 'gray', icon: '●' }
      },
      priority: {
        low: { label: 'Thấp', color: 'green', icon: '↓' },
        medium: { label: 'Trung bình', color: 'yellow', icon: '→' },
        high: { label: 'Cao', color: 'orange', icon: '↑' },
        critical: { label: 'Khẩn cấp', color: 'red', icon: '⚠' }
      },
      severity: {
        low: { label: 'Thấp', color: 'green', icon: '1' },
        medium: { label: 'Trung bình', color: 'yellow', icon: '2' },
        high: { label: 'Cao', color: 'orange', icon: '3' },
        critical: { label: 'Nghiêm trọng', color: 'red', icon: '4' }
      },
      stock: {
        normal: { label: 'Bình thường', color: 'green', icon: '●' },
        low: { label: 'Sắp hết', color: 'yellow', icon: '⚠' },
        out: { label: 'Hết hàng', color: 'red', icon: '✕' },
        excess: { label: 'Dư thừa', color: 'blue', icon: '↑' }
      },
      user: {
        active: { label: 'Hoạt động', color: 'green', icon: '●' },
        inactive: { label: 'Không hoạt động', color: 'gray', icon: '○' },
        suspended: { label: 'Tạm khóa', color: 'red', icon: '✕' }
      }
    };

    return configs[type]?.[status] || { label: status, color: 'gray', icon: '?' };
  };

  const config = getStatusConfig();

  const colorClasses = {
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1 text-base'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${colorClasses[config.color] || colorClasses.gray}
      ${sizeClasses[size]}
    `}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </span>
  );
};

export default StatusBadge;