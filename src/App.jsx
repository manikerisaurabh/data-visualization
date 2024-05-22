import React from 'react'
import Dashboard from './components/Dashboard'
import './App.css';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import RadarChart from './components/RadarChart';
const App = () => {
  return (
    <div className="App">
      <div className="dashboard-container">
        <Dashboard />
        <PieChart />
        <LineChart />
        <RadarChart />
      </div>
    </div>
  )
}

export default App