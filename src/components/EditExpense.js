import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Dashboard.css'
import { Typography } from "@mui/material";

const EditExpense = ({ expense, onClose, fetchExpenses }) => {
    const [title, setTitle] = useState(expense.title || "");
    const [amount, setAmount] = useState(expense.amount || "");
    const [category, setCategory] = useState(expense.category || "");
    const [date, setDate] = useState(expense.date || "");

    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/expense/${expense._id}`, { title, amount, category, date });
            fetchExpenses();
            onClose(); // Close the edit modal
        } catch (err) {
            console.error("Error updating expense:", err.message);
        }
    };

    return (
        <div className="modal">
            <div>
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
                    <button className="submit-btn" type="submit">Update Expense</button>
                    <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditExpense;

