import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/Dashboard.css';
import EditExpense from './EditExpense';
import DeleteExpense from './DeleteExpense';
import SearchIcon from '@mui/icons-material/Search';
import { searchExpense } from '../redux/slices/expenseSlice';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { Select, Button, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ExpensesList = ({ expenses, fetchExpenses, categories }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteExpenseId, setSelectedDeleteExpenseId] = useState(null);

    const [searchParam, setSearchParam] = useState('');
    const [searchValue, setSearchValue] = useState('')

    const dispatch = useDispatch()

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

    const handleSearch = () => {
        dispatch(searchExpense({ searchParam, searchValue }));
    };

    const handleReset = () => {
        dispatch(fetchExpenses());
    };

    return (
        <div className="popup-overlay">
            <h2>Expenses List</h2>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", padding: "10px" }}>
                <Select
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    displayEmpty
                    sx={{ width: "150px" }}
                    size="small"
                >
                    <MenuItem value="" disabled>
                        Select Category
                    </MenuItem>
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    label="Search Value"
                    variant="outlined"
                    size="small"
                    sx={{ width: "200px" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{ minWidth: "40px", height: "40px", display: "flex", alignItems: "center" }}
                >
                    <SearchIcon fontSize="small" />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReset}
                    sx={{ minWidth: "40px", height: "40px", display: "flex", alignItems: "center" }}
                >
                    <RefreshIcon fontSize="small" />
                </Button>
            </div>

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
                    {expenses.length ? expenses.map((expense, index) => (
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
                    )) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                                No Data Available For Display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {
                isPopupOpen && (
                    <div className="popup">
                        <EditExpense
                            expense={getExpenseById(selectedExpenseId)}
                            fetchExpenses={fetchExpenses}
                            categories={categories}
                            onClose={closePopup}
                        />
                    </div>
                )
            }
            {
                isDeletePopupOpen && (
                    <div className="popup">
                        <DeleteExpense
                            expense={getExpenseById(selectedDeleteExpenseId)}
                            fetchExpenses={fetchExpenses}
                            onClose={closeDeletePopup}
                        />
                    </div>
                )
            }
        </div >
    );
};

export default ExpensesList;