import React, { useState, useMemo, useEffect } from 'react';
import DataTable from '../components/SharedComponent/DataTable';
import StatusBadge from '../components/SharedComponent/StatusBadge';
import FilterBar from '../components/SharedComponent/FilterBar';
import api from '../services/api';

const EQUIPMENT_TYPES = [
  'Máy nén khí', 'Băng tải', 'Máy bơm', 'Motor điện', 'Máy cắt', 'Máy hàn',
  'Cần cẩu', 'Máy phát điện', 'Biến áp', 'Tủ điện', 'Hệ thống HVAC'
];

const LOCATIONS = [
  'Sản xuất', 'Đóng gói', 'Kho nguyên liệu', 'Kho thành phẩm', 'Tiện ích',
  'Văn phòng', 'Bảo vệ', 'Xử lý nước thải', 'Trạm điện'
];

const EquipmentCatalog = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/equipments');
      setEquipments(response.data);
    } catch (err) {
      setError(err.message || 'Lỗi tải dữ liệu');
      console.error('Fetch equipments error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // Filter configuration
  const filterConfig = [
    {
      key: 'type',
      label: 'Loại thiết bị',
      type: 'select',
      options: EQUIPMENT_TYPES.map(type => ({ value: type, label: type }))
    },
    {
      key: 'location',
      label: 'Khu vực',
      type: 'select',
      options: LOCATIONS.map(location => ({ value: location, label: location }))
    },
    {
      key: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { value: 'active', label: 'Hoạt động' },
        { value: 'maintenance', label: 'Bảo trì' },
        { value: 'stopped', label: 'Dừng' },
        { value: 'retired', label: 'Thanh lý' }
      ]
    },
    {
      key: 'criticality',
      label: 'Mức độ quan trọng',
      type: 'select',
      options: [
        { value: '5', label: '5 - Rất cao' },
        { value: '4', label: '4 - Cao' },
        { value: '3', label: '3 - Trung bình' },
        { value: '2', label: '2 - Thấp' },
        { value: '1', label: '1 - Rất thấp' }
      ]
    },
    {
      key: 'manufacturer',
      label: 'Nhà sản xuất',
      type: 'text',
      advanced: true
    },
    {
      key: 'installationYear',
      label: 'Năm lắp đặt',
      type: 'number',
      advanced: true
    }
  ];

  // Filter data based on active filters
  const filteredData = useMemo(() => {
    return equipments.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        if (key === 'criticality') {
          return item.criticality.toString() === value;
        }
        
        if (key === 'installationYear') {
          return item.installationYear.toString().includes(value);
        }
        
        return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [filters, equipments]);

  // Table columns configuration
  const columns = [
    {
      key: 'id',
      title: 'Mã thiết bị',
      render: (value) => (
        <span className="font-mono text-blue-600 dark:text-blue-400">{value}</span>
      )
    },
    {
      key: 'name',
      title: 'Tên thiết bị',
      render: (value) => (
        <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>
      )
    },
    {
      key: 'type',
      title: 'Loại',
      render: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      key: 'location',
      title: 'Khu vực',
      render: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (value) => <StatusBadge status={value} type="equipment" />
    },
    {
      key: 'criticality',
      title: 'Mức độ quan trọng',
      render: (value) => (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < value ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )
    },
    {
      key: 'nextMaintenance',
      title: 'Bảo trì tiếp theo',
      render: (value) => {
        const date = new Date(value);
        const today = new Date();
        const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        
        let colorClass = 'text-gray-600 dark:text-gray-400';
        if (diffDays < 0) colorClass = 'text-red-600 dark:text-red-400';
        else if (diffDays <= 7) colorClass = 'text-yellow-600 dark:text-yellow-400';
        else if (diffDays <= 30) colorClass = 'text-blue-600 dark:text-blue-400';
        
        return (
          <div className={`text-sm ${colorClass}`}>
            {date.toLocaleDateString('vi-VN')}
            <div className="text-xs">
              {diffDays < 0 ? `Quá hạn ${Math.abs(diffDays)} ngày` : 
               diffDays === 0 ? 'Hôm nay' : 
               `Còn ${diffDays} ngày`}
            </div>
          </div>
        );
      }
    },
    {
      key: 'actions',
      title: 'Thao tác',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEquipment(row);
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="Xem chi tiết"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEquipment(row);
              setShowForm(true);
            }}
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            title="Chỉnh sửa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              if (confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
                try {
                  await api.delete(`/equipments/${row.id}`);
                  fetchEquipments();
                  alert('Xóa thiết bị thành công');
                } catch (err) {
                  alert('Lỗi xóa thiết bị: ' + err.message);
                }
              }
            }}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Xóa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Danh mục thiết bị
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý thông tin thiết bị và tài sản
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              // Export to Excel
              console.log('Export to Excel');
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Xuất Excel
          </button>
          <button
            onClick={() => {
              setSelectedEquipment(null);
              setShowForm(true);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm thiết bị
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng thiết bị</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : filteredData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hoạt động</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : filteredData.filter(eq => eq.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cần bảo trì</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredData.filter(eq => {
                  const nextMaintenance = new Date(eq.nextMaintenance);
                  const today = new Date();
                  const diffDays = Math.ceil((nextMaintenance - today) / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 4h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17.294 15M10 14l4.724-4.724a1.059 1.059 0 011.496 0L19.294 12M10 14l-4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Dừng hoạt động</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : filteredData.filter(eq => eq.status === 'stopped').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filterConfig}
        onFilterChange={setFilters}
        onClear={() => setFilters({})}
      />

      {/* Equipment Table */}
      <DataTable
        data={loading ? [] : filteredData}
        columns={columns}
        searchable={true}
        sortable={true}
        selectable={true}
        pagination={true}
        pageSize={10}
        onRowClick={(row) => setSelectedEquipment(row)}
        onSelectionChange={(selectedItems) => {
          console.log('Selected equipment:', selectedItems);
        }}
        loading={loading}
        error={error}
      />

      {/* Equipment Detail Modal */}
      {selectedEquipment && !showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Chi tiết thiết bị: {selectedEquipment.name}
              </h3>
              <button
                onClick={() => setSelectedEquipment(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white">Thông tin cơ bản</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Mã thiết bị:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{selectedEquipment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Loại:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedEquipment.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Khu vực:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedEquipment.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Vị trí:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedEquipment.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Trạng thái:</span>
                    <StatusBadge status={selectedEquipment.status} type="equipment" />
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white">Thông tin kỹ thuật</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nhà sản xuất:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedEquipment.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Model:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedEquipment.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Số serial:</span>
                    <span className="font-mono text-gray-900 dark:text-gray-100">{selectedEquipment.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Năm lắp đặt:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedEquipment.installationYear}</span>
                  </div>
                </div>

                {/* Technical Specs */}
                {selectedEquipment.technicalSpecs && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Thông số kỹ thuật:</h5>
                    <div className="space-y-1">
                      {Object.entries(selectedEquipment.technicalSpecs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                          <span className="text-gray-900 dark:text-gray-100">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Documents */}
            {selectedEquipment.documents && selectedEquipment.documents.length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Tài liệu liên quan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedEquipment.documents.map(doc => (
                    <div key={doc.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{doc.type} • {doc.size}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => setSelectedEquipment(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedEquipment ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị mới'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedEquipment(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              try {
                if (selectedEquipment) {
                  await api.put(`/equipments/${selectedEquipment.id}`, data);
                  alert('Cập nhật thành công');
                } else {
                  await api.post('/equipments', data);
                  alert('Thêm mới thành công');
                }
                setShowForm(false);
                setSelectedEquipment(null);
                fetchEquipments();
              } catch (err) {
                alert('Lỗi lưu thiết bị: ' + err.message);
              }
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mã thiết bị *
                  </label>
                  <input
                    type="text"
                    name="id"
                    defaultValue={selectedEquipment?.id || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="VD: EQ001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tên thiết bị *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedEquipment?.name || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Tên thiết bị"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Loại thiết bị *
                  </label>
                  <select
                    defaultValue={selectedEquipment?.type || ''}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Chọn loại thiết bị</option>
                    {EQUIPMENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Khu vực *
                  </label>
                  <select
                    defaultValue={selectedEquipment?.location || ''}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Chọn khu vực</option>
                    {LOCATIONS.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nhà sản xuất
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedEquipment?.manufacturer || ''}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nhà sản xuất"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedEquipment?.model || ''}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Model thiết bị"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedEquipment(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Đang lưu...' : (selectedEquipment ? 'Cập nhật' : 'Thêm mới')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentCatalog;