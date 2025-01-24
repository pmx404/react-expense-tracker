import express from 'express'
import { createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense } from '../controllers/expense.js';

const expenseRouter = express.Router()

expenseRouter.post('/', createExpense)
expenseRouter.get('/',  getAllExpenses)
expenseRouter.post('/:id', getExpense, updateExpense)
expenseRouter.delete('/:id', getExpense, deleteExpense)


export default expenseRouter;