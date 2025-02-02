import React, { useState } from 'react'
import LineChartComponent from '../LineChartComponent/LineChartComponent'
import "./paymentchart.css"

function PaymentChart() {
  const [timeFrame, setTimeFrame] = useState('month'); // 'month' or 'day'

  // Sample monthly data
  const monthlyData = {
    data: [
      { date: '2024-01', amount: 1200, pendingAmount: 300 },
      { date: '2024-02', amount: 1900, pendingAmount: 400 },
      { date: '2024-03', amount: 1500, pendingAmount: 200 },
      { date: '2024-04', amount: 2100, pendingAmount: 500 },
      { date: '2024-05', amount: 1800, pendingAmount: 300 },
      { date: '2024-06', amount: 2300, pendingAmount: 600 },
    ],
    lines: [
      {
        dataKey: 'amount',
        name: 'Completed Payments',
        color: '#4318FF'
      },
      {
        dataKey: 'pendingAmount',
        name: 'Pending Payments',
        color: '#6AD2FF'
      }
    ]
  };

  // Sample daily data
  const dailyData = {
    data: [
      { date: '2024-06-01', amount: 200, pendingAmount: 50 },
      { date: '2024-06-02', amount: 300, pendingAmount: 75 },
      { date: '2024-06-03', amount: 250, pendingAmount: 60 },
      { date: '2024-06-04', amount: 400, pendingAmount: 100 },
      { date: '2024-06-05', amount: 350, pendingAmount: 80 },
      { date: '2024-06-06', amount: 450, pendingAmount: 120 },
      { date: '2024-06-07', amount: 350, pendingAmount: 115 },
    ],
    lines: monthlyData.lines // Using same line config
  };

  const currentData = timeFrame === 'month' ? monthlyData : dailyData;
  
  // Calculate total money earned
  const totalEarned = currentData.data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className='payment-chart card'>
      <div className="card-header">
        <div className="header-top">
          <h4>Payment Overview</h4>
          <div className="time-toggle">
            <button 
              className={`toggle-btn ${timeFrame === 'month' ? 'active' : ''}`}
              onClick={() => setTimeFrame('month')}
            >
              Monthly
            </button>
            <button 
              className={`toggle-btn ${timeFrame === 'day' ? 'active' : ''}`}
              onClick={() => setTimeFrame('day')}
            >
              Daily
            </button>
          </div>
        </div>
        <span className="subtitle">Monthly payment statistics</span>
        <div className="total-earned">
          Total money earned: ${totalEarned.toLocaleString()}
        </div>
      </div>
      <div className='chart-container'>
        <LineChartComponent 
          data={currentData.data} 
          lines={currentData.lines}
          xAxisKey="date"
          xAxisLabel=""
          yAxisLabel=""
          formatXAxis={(date) => timeFrame === 'month' ? date.split('-')[1] : date.split('-')[2]}
        />
      </div>
    </div>
  )
}

export default PaymentChart
