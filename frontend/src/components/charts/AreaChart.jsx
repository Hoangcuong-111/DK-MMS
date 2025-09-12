import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const AreaChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/maintenance');
        const maintenanceItems = response.data;

        // Aggregate by month
        const monthlyData = {};
        maintenanceItems.forEach(item => {
          const date = new Date(item.scheduledDate);
          const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, orders: 0, cost: 0 };
          }
          monthlyData[month].orders += 1;
          monthlyData[month].cost += item.estimatedCost || 0;
        });

        const chartData = Object.values(monthlyData);
        setData(chartData);
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  if (loading) {
    return <div className="h-72 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">Loading chart...</div>;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            name="Số lệnh"
          />
          <Area
            type="monotone"
            dataKey="cost"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
            name="Chi phí"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;