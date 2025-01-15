// import { Pie } from 'react-chartjs-2';

// const data = {
//     labels: ['Rent', 'Groceries', 'Utilities'],
//     datasets: [
//         {
//             data: [500, 200, 150],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         },
//     ],
// };

// const ExpenseChart = () => <Pie data={data} />;
// export default ExpenseChart;

// import React, { useState } from 'react';

// const Dashboard = () => {
//     const [expenses, setExpenses] = useState([]); // State to store expenses
//     const [description, setDescription] = useState(''); // State for expense description
//     const [amount, setAmount] = useState(''); // State for expense amount

//     // Function to add an expense
//     const addExpense = (event) => {
//         event.preventDefault(); // Prevent default form submission

//         // Create a new expense object
//         const newExpense = {
//             description,
//             amount: parseFloat(amount),
//         };

//         // Update the expenses state
//         setExpenses([...expenses, newExpense]);

//         // Clear the input fields
//         setDescription('');
//         setAmount('');
//     };

//     // Calculate total expenses
//     const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

//     return (
//         <div id="dashboard-container">
//             <h1>Expense Tracker Dashboard</h1>
//             <form onSubmit={addExpense}>
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="number"
//                     placeholder="Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Add Expense</button>
//             </form>
//             <h2>Expenses</h2>
//             <ul>
//                 {expenses.map((expense, index) => (
//                     <li key={index}>
//                         {expense.description}: ${expense.amount.toFixed(2)}
//                     </li>
//                 ))}
//             </ul>
//             <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
//         </div>
//     );
// };

// export default Dashboard;

const Dashboard = () => {

    return (
        <div>
            <h1> Welcome to REACT</h1>
        </div>
    )
}

export default Dashboard