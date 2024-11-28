import React from 'react';
import { Link } from 'react-router-dom';

function SignupConfirmed() {
    return (
        <div className="confirmation-container">
            <h2>Account Created Successfully!</h2>
            <p>Your account has been created. You can now log in.</p>
            <Link to="/login">Go to Login</Link>
        </div>
    );
}

export default SignupConfirmed;
