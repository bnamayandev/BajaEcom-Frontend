import React, { useState } from 'react';
import './PasswordModal.css'; // We'll create this CSS file next

const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (password === import.meta.env.VITE_MV_PASSWORD) {
            onSubmit();
            setPassword('');
            setError('');
        } else {
            setError('Invalid Password!');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Enter Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="password-input"
                />
                {error && <p className="error-message">{error}</p>}
                <div className="modal-buttons">
                    <button className="button primary-button" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="button danger-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
