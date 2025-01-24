import React, { useState, useEffect } from "react";
import { getExpenses } from "../services/api";
import EditExpense from "../components/Dashboard/EditExpense";
import DeleteExpense from "../components/Dashboard/DeleteExpense";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await getExpenses(token);
            setExpenses(data);
        } catch (err) {
            console.error("Error fetching expenses:", err.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>
                                <button onClick={() => { setSelectedExpense(expense); setIsEditing(true); }}>Edit</button>
                                <button onClick={() => { setSelectedExpense(expense); setIsDeleting(true); }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <EditExpense
                    expense={selectedExpense}
                    onClose={() => setIsEditing(false)}
                    fetchExpenses={fetchExpenses}
                />
            )}

            {isDeleting && (
                <DeleteExpense
                    expenseId={selectedExpense._id}
                    onClose={() => setIsDeleting(false)}
                    fetchExpenses={fetchExpenses}
                />
            )}
        </div>
    );
};

export default Dashboard;
