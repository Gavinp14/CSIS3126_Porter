import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./progresschart.css";
import LineChartComponent from '../LineChartComponent/LineChartComponent';

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

  const chartLines = [
    { dataKey: 'weight', name: 'Weight (kg)', color: '#8884d8' },
    { dataKey: 'bodyFat', name: 'Body Fat %', color: '#82ca9d' }
  ];

  return (
    <div className="progress-chart-card">
      <h2>Progress Tracking</h2>
      <div className="view-mode-toggle">
        <button 
          className={`btn-primary ${viewMode === 'month' ? 'active' : ''}`}
          onClick={() => setViewMode('month')}
        >
          Monthly View
        </button>
        <button 
          className={`btn-primary ${viewMode === 'day' ? 'active' : ''}`}
          onClick={() => setViewMode('day')}
        >
          Daily View
        </button>
      </div>
      
      <LineChartComponent 
        data={data}
        lines={chartLines}
        xAxisLabel={viewMode === 'month' ? 'Month' : 'Date'}
        yAxisLabel="Value"
        formatXAxis={formatXAxis}
      />

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
          <button className="btn btn-primary" type="submit">Add Entry</button>
        </form>
      </div>
    </div>
  );
}

export default ProgressChart;
