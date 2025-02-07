import React, { useState } from "react";
import axios from "axios";
import '../styles/Dashboard.css'
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

const EditExpense = ({ expense, onClose, fetchExpenses, categories }) => {
    const [title, setTitle] = useState(expense.title || "");
    const [amount, setAmount] = useState(expense.amount || "");
    const [category, setCategory] = useState(expense.category || "");
    const [date, setDate] = useState(expense.date || "");
    const API_URL = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = localStorage.getItem('userId')
            const response = await axios.post(`${API_URL}/api/expense/${expense._id}`, { title, amount, category, date, user });
            dispatch(fetchExpenses())
            onClose(); // Close the edit modal
        } catch (err) {
            console.error("Error updating expense:", err.message);
        }
    };

    return (
        <div className="modal">
            <Typography>Edit Expense</Typography>
            <form className="modal-content" onSubmit={handleSubmit}>
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
                <button className="submit-btn" type="submit">Update Expense</button>
                <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditExpense;

