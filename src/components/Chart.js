import { Doughnut } from 'react-chartjs-2';
import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { Typography } from '@mui/material';

Chart.register(...registerables);

const API_URL = process.env.REACT_APP_API_URL;

const MyChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const chartRef = useRef(null);

    const fetchExpenses = async () => {
        try {
            const user = localStorage.getItem('userId')
            const response = await axios.get(`${API_URL}/api/expense?user=${user}`);

            const groupedExpenses = response.data.reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                return acc;
            }, {});
            console.log(groupedExpenses.length);

            if (!groupedExpenses.length) {
                console.log('hi');

                setChartData(
                    <>
                        <Typography> No data to display</Typography>
                    </>
                )
            }
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
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update(); // Update chart without re-rendering
        }
    }, [chartData]); // Run whenever chartData changes

    return <>
        <h2 style={{ padding: '0px', margin: '0px' }} >Expense Chart</h2>
        {console.log('chartRef', chartRef)}
        {console.log('chartData', chartData.labels.length)}

        {chartData.labels.length ? <Doughnut ref={chartRef} data={chartData} /> : <Typography sx={{ textAlign: 'center', padding: '30px' }}>No Data Available For Display</Typography>}
    </>;
};

export default MyChart;
