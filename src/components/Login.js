// import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/Login.css'

const AuthComponent = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('')

    // Function to handle user sign-in
    const handleSignIn = async () => {
        console.log("Signing in with:", email, password);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('authToken', 'true');
            localStorage.setItem('token', auth.currentUser.accessToken);
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle user sign-up
    const handleSignUp = async () => {
        console.log("Signing up with:", email, password);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem('userName', userName);
            alert("Sign-up successful!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div id="auth-container" className='main-container'>
            {isLogin ? (
                <div id="login-form" className='login-container'>
                    <h1 className='heading-text'>Expense Tracker</h1>
                    <h2 className='heading-text'>User Login</h2>
                    <input className='email-field'
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input className='password-field'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className='login-btn' onClick={handleSignIn}>Sign In</button>
                    <p className='heading-text'>
                        Don't have an account?{' '}
                        <button className='disclaimer' onClick={() => setIsLogin(false)}>Register User</button>
                        {error && <p>{error}</p>}
                    </p>
                </div>
            ) : (
                <div id="signup-form" className='login-container'>
                    <h1 className='heading-text'>Expense Tracker</h1>
                    <h2 className='heading-text'>Register User</h2>

                    <input className='userName-field'
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />

                    <input className='email-field'
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input className='password-field'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className='login-btn' onClick={handleSignUp}>Sign Up</button>
                    <p className='heading-text' >
                        Already have an account?{' '}
                        <button className='disclaimer' onClick={() => setIsLogin(true)}>Sign In</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AuthComponent;