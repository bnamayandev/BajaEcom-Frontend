// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: emailOrUsername,
                password,
            });

            localStorage.setItem('authToken', response.data.token);
            onLogin(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Email"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>

            <p className="redirect-message">
                Don't have an account?{' '}
                <Link to="/signup" className="redirect-link">
                    Sign up here
                </Link>
            </p>
            <p className="redirect-message">
                <Link to="/forgot-password" className="redirect-link">
                    Forgot Password?
                </Link>
            </p>

            <h3>YOU MUST CREATE AN ACCOUNT AND SIGN IN TO VIEW THIS WEBSITE.</h3>
        </div>
    );
}

export default Login;
