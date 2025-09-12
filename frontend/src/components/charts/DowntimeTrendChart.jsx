import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../../services/api';

const DowntimeTrendChart = () => {
  const [downtimeData, setDowntimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await api.get('/incidents');
        // Aggregate downtime by date (assuming each incident has downtime duration, default to 1 hour if not)
        const aggregated = response.data.reduce((acc, incident) => {
          const date = new Date(incident.occurredAt).toLocaleDateString('vi-VN');
          if (!acc[date]) {
            acc[date] = { date, downtime: 0 };
          }
          acc[date].downtime += incident.downtime || 1; // Assume downtime field or default
          return acc;
        }, {});
        setDowntimeData(Object.values(aggregated));
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-blue-600">
            Thời gian dừng: <span className="font-semibold">{payload[0].value} giờ</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Xu hướng thời gian dừng
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Thời gian dừng máy theo ngày trong 2 tuần qua
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={downtimeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6B7280' }}
              label={{ value: 'Giờ', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="downtime"
              name="Thời gian dừng (giờ)"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DowntimeTrendChart;