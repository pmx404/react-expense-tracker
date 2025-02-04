import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/Dashboard.css';
import EditExpense from './EditExpense';
import DeleteExpense from './DeleteExpense';

const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteExpenseId, setSelectedDeleteExpenseId] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/expense`);
            setExpenses(response.data);
        } catch (error) {
            setError("Failed to fetch expenses.");
        } finally {
            setLoading(false);
        }
    };

    const getExpenseById = (id) => {
        return expenses.find(el => el._id === id)
    }

    const openPopup = (expense) => {
        setSelectedExpenseId(expense._id);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedExpenseId(null);
    };

    const deletePopupOpen = (expense) => {

        setSelectedDeleteExpenseId(expense._id);
        setIsDeletePopupOpen(true);
    };

    const closeDeletePopup = () => {
        setIsDeletePopupOpen(false);
        setSelectedDeleteExpenseId(null);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="popup-overlay">
            <h2>Expenses List</h2>
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Slno</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={expense._id}>

                            <td>{index + 1}</td>
                            <td>{expense.title}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>{expense.amount}</td>
                            <td>
                                <button onClick={() => openPopup(expense)} className="edit-btn">
                                    <EditIcon fontSize="small" />
                                </button>
                                <button onClick={() => deletePopupOpen(expense)} className="delete-btn">
                                    <DeleteIcon fontSize="small" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isPopupOpen && (
                <div className="popup">
                    <EditExpense
                        expense={getExpenseById(selectedExpenseId)}
                        fetchExpenses={fetchExpenses}
                        onClose={closePopup}
                    />
                </div>
            )}
            {isDeletePopupOpen && (
                <div className="popup">
                    <DeleteExpense
                        expense={getExpenseById(selectedDeleteExpenseId)}
                        fetchExpenses={fetchExpenses}
                        onClose={closeDeletePopup}
                    />
                </div>
            )}
        </div>
    );
};

export default ExpensesList;
