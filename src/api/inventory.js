import axios from 'axios';

const API_URL = 'http://localhost:13000';

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Grab from inventory
export const getInventory = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/inventory`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};
