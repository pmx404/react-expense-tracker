import Joi from "joi";
import Expense from "../model/expenseData.js";

// Middleware function to get expense by ID
export const getExpense = async function getExpense(req, res, next) {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    console.log('expense', expense)
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.expense = expense;
  next();
}

const exepenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
  user: Joi.string().required(),
});

// create expense
export const createExpense = async (req, res, next) => {
  const { error } = exepenseSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { title, amount, category, date, user } = req.body;
  const expense = new Expense({
    title,
    amount,
    category,
    date,
    user, // Assuming user ID is passed
  });
  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

// GET all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.query.user });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update expense based on id
export const updateExpense = async (req, res) => {
  const { error } = exepenseSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { title, amount, category, date, user } = req.body;

  res.expense.title = title
  res.expense.amount = amount;
  res.expense.category = category;
  res.expense.date = date;
  res.expense.user = user

  try {
    const updatedExpense = await res.expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// delete expense based on id
export const deleteExpense = async (req, res) => {
  try {
    const id = res.expense._id
    const deletedExpense = await Expense.deleteOne(id);
    if (!deletedExpense.acknowledged) {
      res.status(400).json({ message: 'expense not found' });
    }
    res.json({ message: 'Deleted Expense' });
  } catch (err) {
    console.log('test', err)
    res.status(500).json({ message: err.message });
  }
}

export const getExpenseBySearchCategory = async (req, res) => {
  try {
    let expenses

    const filter = { title: req.query.searchVal };
    if (req.query.searchParam) {
      filter.category = req.query.searchParam;
    }
    expenses = await Expense.find(filter);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};