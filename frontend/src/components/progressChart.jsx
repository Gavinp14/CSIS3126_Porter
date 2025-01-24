import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const data = [
  { date: '2024-01-01', bodyFat: 25, weight: 180 },
  { date: '2024-01-15', bodyFat: 24, weight: 178 },
  { date: '2024-02-01', bodyFat: 23, weight: 175 },
  { date: '2024-02-15', bodyFat: 22, weight: 173 },
  { date: '2024-03-01', bodyFat: 21, weight: 170 },
  { date: '2024-03-15', bodyFat: 20, weight: 168 },
];

const MetricCard = ({ title, value, unit }) => (
  <Card className="bg-white">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
      </div>
    </CardContent>
  </Card>
);

const ChartCard = ({ data, metric }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="w-full h-96 bg-white p-4">
      <CardHeader>
        <CardTitle>{metric === 'weight' ? 'Weight Progress' : 'Body Fat Progress'}</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={formatDate}
              formatter={(value) => [`${value}${metric === 'weight' ? ' lbs' : '%'}`]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric === 'weight' ? 'weight' : 'bodyFat'}
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              name={metric === 'weight' ? 'Weight' : 'Body Fat %'}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const ProgressChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const latestData = data[data.length - 1];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Fitness Progress</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Current Weight" 
            value={latestData.weight}
            unit="lbs"
          />
          <MetricCard 
            title="Current Body Fat" 
            value={latestData.bodyFat}
            unit="%"
          />
          <MetricCard 
            title="Weight Lost" 
            value={data[0].weight - latestData.weight}
            unit="lbs"
          />
          <MetricCard 
            title="Body Fat Reduced" 
            value={data[0].bodyFat - latestData.bodyFat}
            unit="%"
          />
        </div>

        <div className="mb-6">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="block w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="weight">Weight Progress</option>
            <option value="bodyFat">Body Fat Progress</option>
          </select>
        </div>

        <ChartCard data={data} metric={selectedMetric} />
      </div>
    </div>
  );
};

export default ProgressChart;
