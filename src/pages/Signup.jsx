import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:13000/signup', formData);
            setError('');
            navigate('/signupconfirmed'); // Redirect to confirmation page after signup
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} required />
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
                <input type='text' name='first_name' placeholder='First Name' value={formData.first_name} onChange={handleChange} required />
                <input type='text' name='last_name' placeholder='Last Name' value={formData.last_name} onChange={handleChange} required />
                <input type='text' name='phone_number' placeholder='Phone Number' value={formData.phone_number} onChange={handleChange} required />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />

                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Signup;