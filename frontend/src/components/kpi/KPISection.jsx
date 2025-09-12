import React, { useState, useEffect } from 'react';
import KPICard from './KPICard';
import api from '../../services/api';

const KPISection = () => {
  const [kpis, setKpis] = useState({
    totalDowntime: { current: 0, unit: 'ca', change: '+12.5%' },
    downtimeHours: { current: 0, unit: 'giờ', change: '-3.2%' },
    maintenanceCompletion: { current: 0, unit: '%', change: '+5.8%' },
    overdueWork: { current: 0, unit: 'công việc', change: '-1.5%' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setLoading(true);
        // Fetch incidents for downtime
        const incidentsRes = await api.get('/incidents');
        const totalIncidents = incidentsRes.data.length;
        const totalDowntimeHours = incidentsRes.data.reduce((sum, inc) => sum + (inc.impact?.match(/(\d+)%/) ? parseFloat(inc.impact.match(/(\d+)%/)[1]) / 100 * 24 : 1), 0); // Approximate

        // Fetch maintenance for completion and overdue
        const maintenanceRes = await api.get('/maintenance');
        const totalMaintenance = maintenanceRes.data.length;
        const completedMaintenance = maintenanceRes.data.filter(m => m.status === 'completed').length;
        const overdueMaintenance = maintenanceRes.data.filter(m => new Date(m.scheduledEnd) < new Date()).length;

        const completionRate = totalMaintenance > 0 ? Math.round((completedMaintenance / totalMaintenance) * 100) : 0;

        setKpis({
          totalDowntime: { current: totalIncidents, unit: 'ca', change: '+12.5%' },
          downtimeHours: { current: Math.round(totalDowntimeHours), unit: 'giờ', change: '-3.2%' },
          maintenanceCompletion: { current: completionRate, unit: '%', change: '+5.8%' },
          overdueWork: { current: overdueMaintenance, unit: 'công việc', change: '-1.5%' }
        });
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  const kpiCards = [
    {
      title: 'Tổng ca dừng',
      value: kpis.totalDowntime.current,
      unit: kpis.totalDowntime.unit,
      change: kpis.totalDowntime.change,
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM8 13a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Thời gian dừng',
      value: kpis.downtimeHours.current,
      unit: kpis.downtimeHours.unit,
      change: kpis.downtimeHours.change,
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Tỉ lệ hoàn thành bảo trì',
      value: kpis.maintenanceCompletion.current,
      unit: kpis.maintenanceCompletion.unit,
      change: kpis.maintenanceCompletion.change,
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Số công việc trễ',
      value: kpis.overdueWork.current,
      unit: kpis.overdueWork.unit,
      change: kpis.overdueWork.change,
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  if (loading) {
    return <div className="mb-8">Loading KPIs...</div>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Chỉ số hiệu suất chính (KPI)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <KPICard
            key={index}
            title={card.title}
            value={card.value}
            unit={card.unit}
            change={card.change}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default KPISection;