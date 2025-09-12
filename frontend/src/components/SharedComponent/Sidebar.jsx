import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState(['dashboard']);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      path: '/dashboard'
    },
    {
      id: 'equipment',
      title: 'Quản lý thiết bị',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      subItems: [
        { id: 'equipment-catalog', title: 'Danh mục thiết bị', path: '/equipment/catalog' },
        { id: 'equipment-technical', title: 'Thông tin kỹ thuật', path: '/equipment/technical' },
        { id: 'equipment-documents', title: 'Hồ sơ liên quan', path: '/equipment/documents' },
        { id: 'equipment-status', title: 'Tình trạng thiết bị', path: '/equipment/status' }
      ]
    },
    {
      id: 'maintenance',
      title: 'Quản lý bảo trì',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      ),
      subItems: [
        { id: 'maintenance-orders', title: 'Lệnh bảo trì', path: '/maintenance/orders' },
        { id: 'maintenance-planning', title: 'Lập kế hoạch', path: '/maintenance/planning' },
        { id: 'maintenance-results', title: 'Kết quả bảo trì', path: '/maintenance/results' },
        { id: 'maintenance-history', title: 'Lịch sử bảo trì', path: '/maintenance/history' }
      ]
    },
    {
      id: 'incidents',
      title: 'Quản lý sự cố',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      subItems: [
        { id: 'incidents-report', title: 'Ghi nhận sự cố', path: '/incidents/report' },
        { id: 'incidents-classify', title: 'Phân loại sự cố', path: '/incidents/classify' },
        { id: 'incidents-assign', title: 'Phân công xử lý', path: '/incidents/assign' },
        { id: 'incidents-metrics', title: 'MTTR & MTBF', path: '/incidents/metrics' }
      ]
    },
    {
      id: 'inventory',
      title: 'Quản lý tồn kho',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      subItems: [
        { id: 'inventory-catalog', title: 'Danh mục phụ tùng', path: '/inventory/catalog' },
        { id: 'inventory-link', title: 'Liên kết thiết bị', path: '/inventory/link' },
        { id: 'inventory-alerts', title: 'Cảnh báo tồn kho', path: '/inventory/alerts' },
        { id: 'inventory-transactions', title: 'Xuất nhập kho', path: '/inventory/transactions' }
      ]
    },
    {
      id: 'schedule',
      title: 'Lịch bảo trì định kỳ',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      subItems: [
        { id: 'schedule-create', title: 'Tạo lịch bảo trì', path: '/schedule/create' },
        { id: 'schedule-alerts', title: 'Cảnh báo đến hạn', path: '/schedule/alerts' },
        { id: 'schedule-auto', title: 'Sinh lệnh tự động', path: '/schedule/auto' }
      ]
    },
    {
      id: 'reports',
      title: 'Báo cáo & Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      subItems: [
        { id: 'reports-downtime', title: 'Báo cáo dừng máy', path: '/reports/downtime' },
        { id: 'reports-maintenance', title: 'Báo cáo bảo trì', path: '/reports/maintenance' },
        { id: 'reports-pareto', title: 'Biểu đồ Pareto', path: '/reports/pareto' },
        { id: 'reports-kpi', title: 'KPI Dashboard', path: '/reports/kpi' }
      ]
    },
    {
      id: 'users',
      title: 'Quản lý người dùng',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      subItems: [
        { id: 'users-accounts', title: 'Tài khoản người dùng', path: '/users/accounts' },
        { id: 'users-permissions', title: 'Phân quyền', path: '/users/permissions' },
        { id: 'users-audit', title: 'Nhật ký truy cập', path: '/users/audit' }
      ]
    }
  ];

  const handleMenuClick = (item) => {
    if (item.subItems) {
      toggleMenu(item.id);
    } else {
      setActiveMenu(item.id);
    }
  };

  // Clean reusable sub-menu item
  const SubMenuItem = ({ subItem, activeMenu, setActiveMenu }) => (
    <Link
      to={subItem.path}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
        activeMenu === subItem.id
          ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 border-l-2 border-blue-500'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
      }`}
      onClick={() => setActiveMenu(subItem.id)}
    >
      {subItem.title}
    </Link>
  );

  // Clean reusable main menu item
  const MainMenuItem = ({ item, activeMenu, setActiveMenu }) => (
    <Link
      to={item.path}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        activeMenu === item.id
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      onClick={() => setActiveMenu(item.id)}
    >
      <div className="flex items-center space-x-3">
        {item.icon}
        <span>{item.title}</span>
      </div>
    </Link>
  );

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Menu chức năng
        </h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.subItems ? (
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeMenu === item.id || expandedMenus.includes(item.id)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMenus.includes(item.id) ? 'rotate-90' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <MainMenuItem item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
              )}
              {/* Sub Items */}
              {item.subItems && expandedMenus.includes(item.id) && (
                <div className="mt-1 ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <SubMenuItem
                      key={subItem.id}
                      subItem={subItem}
                      activeMenu={activeMenu}
                      setActiveMenu={setActiveMenu}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {/* User Role Badge */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Quyền: Quản trị viên
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;