import React, { useState } from 'react';
import axios from 'axios';
//test

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:13000/signup', formData);
            setSuccess('Account created successfully!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} required />
                <input type='text' name='first_name' placeholder='First Name' value={formData.first_name} onChange={handleChange} required />
                <input type='text' name='last_name' placeholder='Last Name' value={formData.last_name} onChange={handleChange} required />
                <input type='text' name='phone_number' placeholder='Phone Number' value={formData.phone_number} onChange={handleChange} required />
                <input type='text' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />

                <button type="submit">Sign Up</button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default Signup;