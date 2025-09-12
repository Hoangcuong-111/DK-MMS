import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const EquipmentStatusChart = ({ filters }) => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/equipments');
        setEquipmentData(response.data);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentData();
  }, []);

  // Aggregate equipment by status
  const statusData = equipmentData.reduce((acc, eq) => {
    const status = eq.status || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value,
    color: name === 'active' ? '#10B981' : name === 'maintenance' ? '#F59E0B' : name === 'stopped' ? '#EF4444' : '#6B7280'
  }));

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Trạng thái thiết bị</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} thiết bị`, 'Số lượng']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquipmentStatusChart;