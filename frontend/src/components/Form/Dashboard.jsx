import React, { useState } from 'react';
import FilterBar from '../SharedComponent/FilterBar';
import KPISection from '../kpi/KPISection';
import DowntimeReasonChart from '../charts/DowntimeReasonChart';
import EquipmentStatusChart from '../charts/EquipmentStatusChart';
import MaintenanceScheduleChart from '../charts/MaintenanceScheduleChart';
import WorkOrderStatusChart from '../charts/WorkOrderStatusChart';
import InventoryStatusChart from '../charts/InventoryStatusChart';
import RecentIncidents from '../tables/RecentIncidents';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: 'week',
    customDateFrom: '',
    customDateTo: '',
    area: 'all',
    equipment: '',
    reportType: 'downtime'
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h1>Test Dashboard</h1>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Bảo trì
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Tổng quan về tình trạng thiết bị và hoạt động bảo trì
        </p>
      </div>

      {/* Filters */}
      <FilterBar onFiltersChange={handleFiltersChange} />

      {/* KPI Section */}
      <KPISection filters={filters} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DowntimeReasonChart filters={filters} />
        </div>
        <div>
          <EquipmentStatusChart filters={filters} />
        </div>
        <div>
          <MaintenanceScheduleChart filters={filters} />
        </div>
        <div>
          <WorkOrderStatusChart filters={filters} />
        </div>
        <div>
          <InventoryStatusChart filters={filters} />
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="mt-8">
        <RecentIncidents filters={filters} />
      </div>
    </div>
  );
};

export default Dashboard;