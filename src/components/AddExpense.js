import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';

const AddExpense = ({ categories, fetchExpenses }) => {
    const [title, setTitle] = useState(''); // State for expense 
    const [amount, setAmount] = useState(''); // State for expense amount
    const [category, setCategory] = useState(''); // State for expense category
    const [date, setDate] = useState(''); // State for expense date
    const [error, setError] = useState(null); // State for errors
    const API_URL = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch()
    const { loading, error: reduxError } = useSelector(state => state.expenses)

    // Function to add an expense
    const addExpense = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const user = localStorage.getItem('userId')
        const token = localStorage.getItem('token')

        const newExpense = {
            title,
            amount: parseFloat(amount),
            category,
            date,
            user
        };

        try {
            // Make the API call
            const response = await axios.post(`${API_URL}/api/expense/`, newExpense, { headers: { 'Authorization': `Bearer ${token}` } });
            dispatch(fetchExpenses())

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
                <button className="submit-btn"
                    type="submit"
                    disabled={loading}>Add Expense</button>
            </form>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {reduxError && <p style={{ color: 'red' }}>{reduxError}</p>}
        </div>
    );
};

export default AddExpense;