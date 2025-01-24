import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';


const ExpensesList = () => {
    // State to hold the expenses data
    const [expenses, setExpenses] = useState([]);
    // State to handle loading state
    const [loading, setLoading] = useState(true);
    // State to handle error
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    // Function to fetch expenses from the API
    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/expense`);
            console.log(response);

            if (!response.statusText) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            setExpenses(data); // Assuming the API returns an array of expenses
        } catch (error) {
            setError(error.message); // Set the error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // useEffect to call fetchExpenses on component mount
    useEffect(() => {
        fetchExpenses();
    }, []); // Empty dependency array means this runs once on mount

    // Render loading, error, or expenses
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Expenses List</h2>
            <ul>
                {expenses.map(expense => (
                    console.log(expense),

                    < li key={expense._id} > {expense.title}: ${expense.amount}</li>
                ))}
            </ul>
        </div >
    );
};


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'title', headerName: 'Title', width: 130 },
//     { field: 'category', headerName: 'Category', width: 130 },
//     {
//         field: 'date',
//         headerName: 'Date',
//         // description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
//     {
//         field: 'amount',
//         headerName: 'Amount',
//         type: 'number',
//         width: 90,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];  

// const paginationModel = { page: 0, pageSize: 5 };

// export default function DataTable() {
//     return (
//         <Paper sx={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{ pagination: { paginationModel } }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//                 sx={{ border: 0 }}
//             />
//         </Paper>
//     );
// }



export default ExpensesList;