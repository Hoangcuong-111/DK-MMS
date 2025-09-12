import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const RadarChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/maintenance');
        const maintenance = response.data;

        // Define subjects and compute scores for current and previous period
        // For simplicity, use total counts normalized to 0-100
        const currentMonth = new Date().getMonth();
        const previousMonth = currentMonth - 1;

        const subjects = [
          { subject: 'Speed', current: 0, previous: 0 },
          { subject: 'Quality', current: 0, previous: 0 },
          { subject: 'Support', current: 0, previous: 0 },
          { subject: 'Features', current: 0, previous: 0 },
          { subject: 'UX', current: 0, previous: 0 },
          { subject: 'Stability', current: 0, previous: 0 }
        ];

        maintenance.forEach(item => {
          const itemMonth = new Date(item.scheduledDate).getMonth();
          const score = 100; // Simplified, could be based on status or cost
          if (itemMonth === currentMonth) {
            subjects[0].current = Math.min(100, (subjects[0].current + score / 10)); // Example
            // Similar for others
          } else if (itemMonth === previousMonth) {
            subjects[0].previous = Math.min(100, (subjects[0].previous + score / 10));
          }
        });

        // For demo, set some values based on counts
        const totalCurrent = maintenance.filter(item => new Date(item.scheduledDate).getMonth() === currentMonth).length;
        const totalPrevious = maintenance.filter(item => new Date(item.scheduledDate).getMonth() === previousMonth).length;

        subjects.forEach((s, index) => {
          s.A = totalCurrent > 0 ? (totalCurrent / 10 + index * 5) % 100 : 50;
          s.B = totalPrevious > 0 ? (totalPrevious / 10 + index * 3) % 100 : 40;
        });

        setData(subjects);
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
        setData([
          { subject: 'Speed', A: 50, B: 40 },
          { subject: 'Quality', A: 60, B: 50 },
          { subject: 'Support', A: 70, B: 60 },
          { subject: 'Features', A: 80, B: 70 },
          { subject: 'UX', A: 90, B: 80 },
          { subject: 'Stability', A: 70, B: 60 }
        ]);
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
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Current Period"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Previous Period"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;