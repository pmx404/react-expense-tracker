import { Doughnut } from 'react-chartjs-2';
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
        {
            label: "1",
            data: [20, 30, 40, 10],
            backgroundColor: [
                "rgba(43, 63, 229, 0.8)",
                "rgba(250, 192, 19, 0.8)",
                "rgba(253, 135, 135, 0.8)",
                "rgba(117, 167, 74, 0.8)",
                "rgba(164, 52, 151, 0.8)",
            ],
            borderColor: [
                "rgba(43, 63, 229, 0.8)",
                "rgba(250, 192, 19, 0.8)",
                "rgba(253, 135, 135, 0.8)",
                "rgba(117, 167, 74, 0.8)",
                "rgba(164, 52, 151, 0.8)",
            ],
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

// Register required components
Chart.register(...registerables);

const MyChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // Destroy the existing chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(chartRef.current, {
            type: 'doughnut', // Change this to your desired chart type
            data: data,
            options: options,
        });

        // Cleanup function to destroy the chart instance on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, options]); // Re-run effect if data or options change

    return <canvas ref={chartRef} />;
};

export default MyChart;
