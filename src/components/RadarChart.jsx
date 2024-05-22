// src/RadarChart.js
import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const initialRadarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [65, 59, 90, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'Dataset 2',
            data: [28, 48, 40, 19, 96, 27, 100],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        },
    ],
};

const RadarChart = () => {
    const [radarData, setRadarData] = useState(initialRadarData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = {
        labels: radarData.labels.filter(label =>
            label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        datasets: radarData.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.filter((value, index) =>
                radarData.labels[index].toLowerCase().includes(searchTerm.toLowerCase())
            ),
        })),
    };

    const options = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
            },
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy',
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>Radar Chart Visualization</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search labels..."
            />
            <Radar data={filteredData} options={options} />
        </div>
    );
};

export default RadarChart;
