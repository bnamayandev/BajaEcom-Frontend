import axios from 'axios';

const API_URL = 'http://localhost:13000';

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const getOrders = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const createOrder = async (orderData) => {
    const token = getAuthToken();
    return axios.post(`${API_URL}/orders`, orderData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const toggleFulfillmentStatus = async (id, staffSignoff) => {
    const token = getAuthToken();
    return axios.put(
        `${API_URL}/orders/${id}/toggle-fulfillment`,
        { staff_signoff: staffSignoff },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const toggleVoidStatus = async (id) => {
    const token = getAuthToken();
    return axios.put(
        `${API_URL}/orders/${id}/void`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

