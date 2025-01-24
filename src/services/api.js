import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const signup = (userData) => axios.post(`${API_URL}/auth/signup`, userData);
export const login = (credentials) => axios.post(`${API_URL}/auth/signin`, credentials);

export const getExpenses = () => axios.get(`${API_URL}/api/expense/`);

export const addExpense = (expense,) => axios.post(`${API_URL}/api/expense`, expense);
export const editExpense = (id, expense,) => axios.post(`${API_URL}/api/expense/${id}`, expense);
export const deleteExpense = (id,) => axios.delete(`${API_URL}/api/expense/${id}`);
