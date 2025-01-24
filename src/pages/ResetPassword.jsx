// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import './ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from query param ?token=
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing token.');
        }
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setStatusMessage('');

        if (!token) {
            setError('No reset token provided.');
            return;
        }
        if (!newPassword || !confirmPassword) {
            setError('Please fill out all fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await resetPassword(token, newPassword);
            setStatusMessage(response.data.message);
            // Optionally redirect to login after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            {error && <p className="error">{error}</p>}
            {statusMessage && <p className="status-message">{statusMessage}</p>}

            <form onSubmit={handleResetPassword} className="reset-password-form">
                <label>New Password:</label>
                <input
                    type="password"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
