// src/api/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const forgotPassword = (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};


export const resetPassword = (token, newPassword) => {
    return axios.post(`${API_URL}/reset-password`, { token, newPassword });
};
