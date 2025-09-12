import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const InventoryStatusChart = ({ filters }) => {
  const [partsData, setPartsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await api.get('/inventory');
        setPartsData(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Aggregate inventory by status (low stock, normal, high)
  const statusData = partsData.reduce((acc, part) => {
    const stockLevel = part.currentStock / (part.minStockLevel || 1);
    const status = stockLevel < 0.5 ? 'low' : stockLevel < 1.5 ? 'normal' : 'high';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value,
    color: name === 'low' ? '#EF4444' : name === 'normal' ? '#10B981' : '#3B82F6'
  }));

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tồn kho</h3>
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
          <Tooltip formatter={(value) => [`${value} SKU`, 'Số lượng']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryStatusChart;