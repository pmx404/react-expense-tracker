import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<Navigate to="login" />} />
                <Route index path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </Router>
    );
};

export default App;