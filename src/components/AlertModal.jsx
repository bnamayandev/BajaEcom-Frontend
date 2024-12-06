import React from 'react';
import './AlertModal.css';

const AlertModal = ({ isOpen, onClose, title, message, type = 'success' }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button
                        className={`button ${type === 'success' ? 'primary-button' : 'danger-button'}`}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
