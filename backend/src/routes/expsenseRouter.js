import express from 'express'
import { createExpense, getAllExpenses, getExpenseBySearchCategory, getExpense, updateExpense, deleteExpense } from '../controllers/expense.js';
import tokenVerification from '../middlewares/tokenVerification.js';

const expenseRouter = express.Router()

expenseRouter.post('/', tokenVerification, createExpense)
expenseRouter.get('/', tokenVerification, getAllExpenses)
expenseRouter.post('/:id', tokenVerification, getExpense, updateExpense)
expenseRouter.delete('/:id', tokenVerification, getExpense, deleteExpense)
expenseRouter.get('/search', tokenVerification, getExpenseBySearchCategory)


export default expenseRouter;