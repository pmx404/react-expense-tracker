import React from "react";
import axios from "axios";
import '../styles/Dashboard.css'
import { useDispatch } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;

const DeleteExpense = ({ expense, onClose, fetchExpenses }) => {
    const dispatch = useDispatch()
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${API_URL}/api/expense/${expense._id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            dispatch(fetchExpenses())
            onClose(); // Close the delete confirmation
        } catch (err) {
            console.error("Error deleting expense:", err.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Are you sure you want to delete this expense?</h3>
                <button className="submit-btn" onClick={handleDelete}>Yes, Delete</button>
                <button className="cancel-btn" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteExpense;
