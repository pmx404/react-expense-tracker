import React, { useState, useEffect } from "react";
import axios from "axios";

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
            console.log(response);
            fetchExpenses();
            onClose(); // Close the edit modal
        } catch (err) {
            console.error("Error updating expense:", err.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit Expense</h3>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Update Expense</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditExpense;

