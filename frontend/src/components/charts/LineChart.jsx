import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const LineChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidentsData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/incidents');
        const incidents = response.data;

        // Aggregate by month
        const monthlyData = {};
        incidents.forEach(incident => {
          const date = new Date(incident.reportDate || incident.createdAt);
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, incidents: 0, resolved: 0 };
          }
          monthlyData[month].incidents += 1;
          if (incident.status === 'completed') {
            monthlyData[month].resolved += 1;
          }
        });

        const chartData = Object.values(monthlyData);
        setData(chartData);
      } catch (error) {
        console.error('Error fetching incidents data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidentsData();
  }, []);

  if (loading) {
    return <div className="h-72 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">Loading chart...</div>;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="incidents"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Sự cố"
          />
          <Line
            type="monotone"
            dataKey="resolved"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Đã giải quyết"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;

