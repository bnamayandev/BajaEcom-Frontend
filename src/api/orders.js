import axios from 'axios';

const API_URL = 'http://localhost:13000'; // Update if your backend runs on a different port or domain

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

// NEW: Get the user's orders
export const getUserOrders = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/user/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// NEW: User cancels their own order
export const cancelOrder = async (id) => {
    const token = getAuthToken();
    return axios.put(
        `${API_URL}/orders/${id}/cancel`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
