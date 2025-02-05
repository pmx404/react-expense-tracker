import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'

const AddExpense = ({ categories }) => {
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
        const user = localStorage.getItem('userId')

        const newExpense = {
            title,
            amount: parseFloat(amount),
            category,
            date,
            user
        };

        try {
            // Make the API call
            const response = await axios.post(`${API_URL}/api/expense/`, newExpense);

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
            <h1 style={{ margin: '0px', padding: '0px' }}>Add Expense</h1>

            {/* Form for adding a new expense */}
            <form className='modal-content' onSubmit={addExpense}>
                <input
                    type="text"
                    placeholder="Title"
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
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a category</option> {/* Placeholder option */}
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button onClick={() => alert('Expense added')} className='submit-btn' type="submit">Add Expense</button>
            </form>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddExpense;