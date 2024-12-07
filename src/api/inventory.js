// src/api/inventory.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Fetch inventory data
export const getInventory = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/inventory`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};
