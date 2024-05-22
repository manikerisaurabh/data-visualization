// src/PieChart.js
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const initialPieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const PieChart = () => {
    const [pieData, setPieData] = useState(initialPieData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = {
        labels: pieData.labels.filter(label =>
            label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        datasets: [
            {
                ...pieData.datasets[0],
                data: pieData.datasets[0].data.filter((value, index) =>
                    pieData.labels[index].toLowerCase().includes(searchTerm.toLowerCase())
                ),
                backgroundColor: pieData.datasets[0].backgroundColor.filter((color, index) =>
                    pieData.labels[index].toLowerCase().includes(searchTerm.toLowerCase())
                ),
                borderColor: pieData.datasets[0].borderColor.filter((color, index) =>
                    pieData.labels[index].toLowerCase().includes(searchTerm.toLowerCase())
                ),
            },
        ],
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
            <h2>Pie Chart Visualization</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search labels..."
            />
            <Pie data={filteredData} options={options} />
        </div>
    );
};

export default PieChart;
