import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AddExpense from './AddExpense'
import '../styles/Dashboard.css'
import MyChart from './Chart';
import Logout from './Logout';
import { Container, Paper, Card } from '@mui/material';
// import EditExpense from './EditExpense';
import { useState } from 'react';
import ExpensesList from './ListExpenses';


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
        segment: 'action-items',
        title: 'Action-items',
        icon: <CategoryIcon />,
        children: [
            {
                segment: 'add',
                title: 'Add Expense',
                icon: <AddIcon />,
            },
            {
                segment: 'edit',
                title: 'Edit Expense',
                icon: <EditIcon />,
            },
            {
                segment: 'delete',
                title: 'Delete Expense',
                icon: <DeleteIcon />,
            },
        ],
    },
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
    return (
        <Box
            sx={{
                py: 4,
                px: 10,
                display: 'flex',
                flexDirection: 'row',
                // rowGap: 10,
                columnGap: 30,
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            {pathname === '/dashboard' ? <> <Card elevation={15} className='categoryCard'><MyChart /></Card> <Card elevation={15} className='categoryCard'> <ExpensesList /></Card> </> : null}
            {pathname === '/action-items/add' ? <AddExpense /> : null}
            {/* {pathname === '/action-items/edit' ? <EditExpense /> : null} */}
        </Box>
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
