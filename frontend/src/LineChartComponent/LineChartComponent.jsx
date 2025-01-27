import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartComponent({ 
  data, 
  lines, // Array of objects with dataKey, name, and color
  xAxisKey = 'date',
  xAxisLabel = 'Date',
  yAxisLabel = 'Value',
  height = 400,
  formatXAxis = (value) => value,
}) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey} 
            tickFormatter={formatXAxis}
            label={{ 
              value: xAxisLabel, 
              position: 'bottom',
              offset: 0
            }}
          />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
          {lines.map((line, index) => (
            <Line 
              key={line.dataKey}
              type="monotone" 
              dataKey={line.dataKey} 
              name={line.name} 
              stroke={line.color} 
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;