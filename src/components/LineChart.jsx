// src/LineChart.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const initialLineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
        },
        {
            label: 'Dataset 2',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.1,
        },
    ],
};

const LineChart = () => {
    const [lineData, setLineData] = useState(initialLineData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = {
        ...lineData,
        datasets: lineData.datasets.filter(dataset =>
            dataset.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    };

    const options = {
        responsive: true,
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>Line Chart Visualization</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search datasets..."
            />
            <Line data={filteredData} options={options} />
        </div>
    );
};

export default LineChart;
