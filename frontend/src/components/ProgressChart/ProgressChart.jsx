import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./progresschart.css";

function ProgressChart() {
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'day'
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: ''
  });
  
  // Sample data - replace with real data
  const [data, setData] = useState([
    { date: '2024-01-01', weight: 85, bodyFat: 25 },
    { date: '2024-02-01', weight: 83, bodyFat: 24 },
    { date: '2024-03-01', weight: 82, bodyFat: 23 },
    { date: '2024-04-01', weight: 80, bodyFat: 22 },
    { date: '2024-05-01', weight: 78, bodyFat: 21 },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      date: newEntry.date,
      weight: parseFloat(newEntry.weight),
      bodyFat: parseFloat(newEntry.bodyFat)
    };
    setData(prev => [...prev, newData].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFat: ''
    });
  };

  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    return viewMode === 'month' 
      ? date.toLocaleString('default', { month: 'short' })
      : date.toLocaleDateString();
  };

  return (
    <div className="progress-chart-card">
      <h2>Progress Tracking</h2>
      <div className="view-mode-toggle">
        <button 
          className={viewMode === 'month' ? 'active' : ''} 
          onClick={() => setViewMode('month')}
        >
          Monthly View
        </button>
        <button 
          className={viewMode === 'day' ? 'active' : ''} 
          onClick={() => setViewMode('day')}
        >
          Daily View
        </button>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              label={{ 
                value: viewMode === 'month' ? 'Month' : 'Date', 
                position: 'bottom',
                offset: 0
              }}
            />
            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
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
            <Line 
              type="monotone" 
              dataKey="weight" 
              name="Weight (kg)" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }}
            />
            <Line 
              type="monotone" 
              dataKey="bodyFat" 
              name="Body Fat %" 
              stroke="#82ca9d" 
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="data-input-section">
        <h3>Add New Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={newEntry.date}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Weight (kg):
              <input
                type="number"
                step="0.1"
                name="weight"
                value={newEntry.weight}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Body Fat %:
              <input
                type="number"
                step="0.1"
                name="bodyFat"
                value={newEntry.bodyFat}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button type="submit">Add Entry</button>
        </form>
      </div>
    </div>
  );
}

export default ProgressChart;
