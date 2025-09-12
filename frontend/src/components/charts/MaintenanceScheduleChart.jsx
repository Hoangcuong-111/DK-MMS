import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const MaintenanceScheduleChart = ({ filters }) => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/maintenance');
        setMaintenanceData(response.data);
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  // Process data into monthly scheduled vs completed
  const scheduleData = maintenanceData.reduce((acc, item) => {
    const scheduledStart = new Date(item.scheduledStart);
    const month = scheduledStart.toLocaleDateString('vi-VN', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { month, scheduled: 0, completed: 0 };
    }
    acc[month].scheduled += 1;
    if (item.status === 'completed') {
      acc[month].completed += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(scheduleData).sort((a, b) => a.month.localeCompare(b.month));

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Lịch bảo trì</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="scheduled" stroke="#3B82F6" name="Lịch" />
          <Line type="monotone" dataKey="completed" stroke="#10B981" name="Hoàn thành" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaintenanceScheduleChart;