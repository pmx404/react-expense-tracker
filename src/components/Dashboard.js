import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AddExpense from './AddExpense'
import '../styles/Dashboard.css'
import MyChart from './Chart';
import Logout from './Logout';
import ExpensesList from './ListExpenses';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const categories = [
    { value: 'food', label: 'Food' },
    { value: 'transport', label: 'Transport' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'other', label: 'Other' }
];


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'add',
        title: 'Add Expense',
        icon: <AddIcon />,
    }
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchExpenses = async () => {
        try {
            const user = localStorage.getItem("userId");
            const response = await axios.get(`${API_URL}/api/expense?user=${user}`);
            setExpenses(response.data);
        } catch (error) {
            setError("Failed to fetch expenses.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <Box
            sx={{
                py: 4,
                px: 10,
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {pathname === '/dashboard' ?
                <Paper
                    elevation={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        backgroundColor: '#EEF6F8',
                        width: '110rem',
                        height: 'fit-content',
                        paddingBottom: '50px'
                    }}
                >
                    < Paper
                        elevation={15}
                        sx={{
                            width: 'fit-content',
                            height: 'fit-content',
                            padding: '25px',
                            marginTop: '100px'
                        }}
                    >
                        <MyChart expenses={expenses} />
                    </Paper>
                    <Paper
                        elevation={15}
                        sx={{
                            width: 'fit-content',
                            height: 'it-content',
                            marginTop: '100px',
                            padding: '25px',
                        }}
                        className='expenses-table'
                    >
                        <ExpensesList categories={categories} expenses={expenses} fetchExpenses={fetchExpenses} />
                    </Paper>
                </Paper > : null
            }
            {pathname === '/add' ? <AddExpense fetchExpenses={fetchExpenses} categories={categories} /> : null}
        </Box >
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {

    const { window } = props;
    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img />,
                title: 'Expense Tracker',
            }}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >

            <DashboardLayout
                slots={{
                    toolbarActions: Logout,
                }}>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

DashboardLayoutBasic.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashboardLayoutBasic;
