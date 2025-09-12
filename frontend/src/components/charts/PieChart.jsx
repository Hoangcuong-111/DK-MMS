import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { COLORS } from '../../data/mockData';
import api from '../../services/api';

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/equipment');
        const equipments = response.data;

        // Group by status
        const statusCounts = {};
        equipments.forEach(equip => {
          const status = equip.status || 'unknown';
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        const pieData = Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value
        }));

        setData(pieData);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentData();
  }, []);

  if (loading) {
    return <div className="h-72 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">Loading chart...</div>;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} thiết bị`, 'Số lượng']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;