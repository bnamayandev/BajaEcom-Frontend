// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { forgotPassword } from '../api/auth'; // We'll create this helper below
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setStatusMessage('');

        try {
            const response = await forgotPassword(email);
            setStatusMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="forgot-password-form">
                <label htmlFor="email">Enter your email:</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {error && <p className="error">{error}</p>}
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
};

export default ForgotPassword;
