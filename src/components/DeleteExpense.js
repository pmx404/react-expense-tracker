import React from "react";
import { deleteExpense } from "../services/api";
const API_URL = process.env.REACT_APP_API_URL;

const DeleteExpense = ({ expenseId, onClose, fetchExpenses }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_URL}/api/expense/${expenseId}`)
            fetchExpenses();
            onClose(); // Close the delete confirmation
        } catch (err) {
            console.error("Error deleting expense:", err.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Are you sure you want to delete this expense?</h3>
                <button onClick={handleDelete}>Yes, Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteExpense;
