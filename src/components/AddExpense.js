import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
    const [expenses, setExpenses] = useState([]); // State to store expenses
    const [title, setTitle] = useState(''); // State for expense 
    const [amount, setAmount] = useState(''); // State for expense amount
    const [category, setCategory] = useState(''); // State for expense category
    const [date, setDate] = useState(''); // State for expense date
    const [error, setError] = useState(null); // State for errors
    const API_URL = process.env.REACT_APP_API_URL;

    // Function to add an expense
    const addExpense = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const newExpense = {
            title,
            amount: parseFloat(amount),
            category,
            date,
            // user: '6792762975b2d79993bd96d0', // Hardcoded user for now
        };

        try {
            // Make the API call
            const response = await axios.post(`${API_URL}/api/expense/`, newExpense);
            console.log('Expense added:', response.data);

            // Update the local state with the new expense
            setExpenses([...expenses, response.data]);

            // Clear the input fields
            setTitle('');
            setAmount('');
            setCategory('');
            setDate('');
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Error adding expense:', err.message);
            setError('Failed to add expense. Please try again.');
        }
    };

    return (
        <div id="dashboard-container">
            <h1>Expense Tracker Dashboard</h1>

            {/* Form for adding a new expense */}
            <form onSubmit={addExpense}>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Add Expense</button>
            </form>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* List of expenses */}
            <h2>Expenses</h2>
            {/* <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.title} - ${expense.amount.toFixed(2)} - {expense.category} - {expense.date}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default AddExpense;


// import React, { useState } from "react";
// import { addExpense } from "../services/api";

// const AddExpense = ({ fetchExpenses }) => {
//     const [title, setTitle] = useState("");
//     const [amount, setAmount] = useState("");
//     const [category, setCategory] = useState("");
//     const [date, setDate] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem("token");
//             await addExpense({ title, amount, category, date }, token);
//             fetchExpenses();
//             setTitle("");
//             setAmount("");
//             setCategory("");
//             setDate("");
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//             <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
//             <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
//             <button type="submit">Add Expense</button>
//         </form>
//     );
// };

// export default AddExpense;

