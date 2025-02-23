import { Doughnut } from 'react-chartjs-2';
import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Typography } from '@mui/material';

Chart.register(...registerables);

const MyChart = ({ expenses }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const chartRef = useRef(null);

    useEffect(() => {
        const groupedExpenses = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        const labels = Object.keys(groupedExpenses);
        const data = Object.values(groupedExpenses);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Expenses",
                    data: data,
                    backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                        "rgba(117, 167, 74, 0.8)",
                        "rgba(215, 55, 57, 0.8)",
                    ],
                },
            ],
        });

        if (chartRef.current) {
            chartRef.current.update(); // Ensure chart updates dynamically
        }
    }, [expenses]);

    return <>
        <h2 style={{ padding: '0px', margin: '0px' }} >Expense Chart</h2>

        {chartData.labels.length ? <Doughnut ref={chartRef} data={chartData} /> : <Typography sx={{ textAlign: 'center', padding: '30px' }}>No Data Available For Display</Typography>}
    </>;
};

export default MyChart;
