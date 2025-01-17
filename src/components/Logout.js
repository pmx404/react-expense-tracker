import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Logout = () => {
    const history = useNavigate();

    const handleLogout = () => {
        // Remove user authentication details from local storage or context
        localStorage.removeItem('authToken'); // Example for removing a token
        // You can also clear user state from a context or global state if using Redux or context API

        // Redirect to the login page or home page
        history('/login'); // Change the path as needed
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;