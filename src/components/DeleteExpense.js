import React from "react";
import { deleteExpense } from "../services/api";

const DeleteExpense = ({ expenseId, onClose, fetchExpenses }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await deleteExpense(expenseId, token);
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
