// src/Dashboard.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const staticData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: 'Dataset 2',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
    ],
};

const Dashboard = () => {
    const [chartData, setChartData] = useState(staticData);
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    const handleFilter = () => {
        const filteredData = staticData.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.filter((value) => value >= minValue && value <= maxValue),
        }));

        setChartData({
            ...staticData,
            datasets: filteredData,
        });
    };

    return (
        <div className="chart-container">
            <h2>Bar Chart Visualization</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += Math.round(context.raw * 100) / 100;
                                    return label;
                                },
                            },
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'xy',
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true,
                                },
                                mode: 'xy',
                            },
                        },
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(200, 200, 200, 0.3)',
                            },
                        },
                    },
                }}
            />
            <div className="controls">
                <label>
                    Min Value:
                    <input
                        type="number"
                        value={minValue}
                        onChange={(e) => setMinValue(Number(e.target.value))}
                    />
                </label>
                <label>
                    Max Value:
                    <input
                        type="number"
                        value={maxValue}
                        onChange={(e) => setMaxValue(Number(e.target.value))}
                    />
                </label>
                <button onClick={handleFilter}>Filter</button>
            </div>
        </div>
    );
};

export default Dashboard;
