import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses", async () => {
    const user = localStorage.getItem("userId");
    const response = await axios.get(`${API_URL}/api/expense?user=${user}`);
    return response.data;
});

const expenseSlice = createSlice({
    name: "expenses",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        addExpense: (state, action) => {
            state.data.push(action.payload);
        },
        deleteExpense: (state, action) => {
            state.data = state.data.filter(expense => expense._id !== action.payload);
        },
        updateExpense: (state, action) => {
            const index = state.data.findIndex(exp => exp._id === action.payload._id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addExpense, deleteExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
