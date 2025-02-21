import React, { useState, useEffect } from 'react';
import LineChartComponent from '../LineChartComponent/LineChartComponent';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import "./progresschart.css";

function ProgressChart() {
  const { getUserId, getToken } = useAuth();
  const userId = getUserId();
  const token = getToken();

  const [viewMode, setViewMode] = useState('month'); // 'month' or 'day'
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
    weight: '',
    bodyFat: ''
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  // Fetch progress data when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      fetchProgressData();
    }
  }, [userId]);

  const fetchProgressData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/progress/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      // Ensure the backend returns { progress: [...] }
      const progressData = response.data.progress;

      // Filter data for the logged-in user (redundant check, but good practice)
      const filteredData = progressData.filter(entry => entry.user_id === userId);

      // Ensure dates are in valid format (YYYY-MM-DD)
      const formattedData = filteredData.map(entry => ({
        ...entry,
        progress_date: new Date(entry.progress_date).toISOString().split('T')[0]
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching progress data:', error);
      setError('Failed to fetch progress data.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const entryData = {
      user_id: userId,
      progress_date: newEntry.date,
      weight: parseFloat(newEntry.weight),
      body_fat_percentage: parseFloat(newEntry.bodyFat)
    };

    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/v1/progress`, entryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Refresh the progress data after successful POST
        fetchProgressData();

        // Reset the input form
        setNewEntry({
          date: new Date().toISOString().split('T')[0],
          weight: '',
          bodyFat: ''
        });
      } else {
        setError('Failed to add new entry.');
      }
    } catch (error) {
      console.error('Error adding new entry:', error);
      setError('Failed to add new entry. Please try again.');
    }
  };

  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return ''; // Return empty string if the date is invalid
    }
    return viewMode === 'month'
      ? date.toLocaleString('default', { month: 'short' })
      : date.toLocaleDateString();
  };

  const chartLines = [
    { dataKey: 'weight', name: 'Weight (lbs)', color: '#8884d8' },
    { dataKey: 'body_fat_percentage', name: 'Body Fat %', color: '#82ca9d' }
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
        xAxisLabel={viewMode === 'month' ? 'Month' : 'Past 5 Days'}
        yAxisLabel="Value"
        formatXAxis={formatXAxis}
      />

      <div className="data-input-section">
        <h3>Add New Entry</h3>
        {error && <p className="error-message">{error}</p>}
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
              Weight (lbs):
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