import React, { useState } from 'react';

const TableToolbar = ({ onExport, onSaveFilter, onCreateReport }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const exportOptions = [
    { id: 'csv', label: 'Xuất CSV', icon: '📊' },
    { id: 'xlsx', label: 'Xuất Excel', icon: '📈' },
    { id: 'pdf', label: 'Xuất PDF', icon: '📄' }
  ];

  const handleExport = (format) => {
    onExport?.(format);
    setShowExportMenu(false);
    // Show toast notification
    const event = new CustomEvent('showToast', {
      detail: { message: `Đang xuất file ${format.toUpperCase()}...`, type: 'info' }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Tổng số bản ghi: <strong>247</strong></span>
          <span>•</span>
          <span>Tổng thời lượng: <strong>4,285 phút</strong></span>
          <span>•</span>
          <span>Số thiết bị: <strong>12</strong></span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Xuất dữ liệu
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Save Filter Button */}
          <button
            onClick={() => {
              onSaveFilter?.();
              const event = new CustomEvent('showToast', {
                detail: { message: 'Đã lưu cấu hình bộ lọc!', type: 'success' }
              });
              window.dispatchEvent(event);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
            Lưu bộ lọc
          </button>

          {/* Create Report Button */}
          <button
            onClick={() => {
              onCreateReport?.();
              const event = new CustomEvent('showToast', {
                detail: { message: 'Đang tạo báo cáo...', type: 'info' }
              });
              window.dispatchEvent(event);
            }}
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
            Tạo báo cáo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableToolbar;