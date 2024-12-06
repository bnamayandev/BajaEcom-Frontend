// src/api/orders.js
import axios from 'axios';

// Use Vite's environment variable
const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Fetch all orders
export const getOrders = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

// Create a new order
export const createOrder = async (orderData) => {
    const token = getAuthToken();
    return axios.post(`${API_URL}/orders`, orderData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Toggle fulfillment status of an order
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

// Toggle void status of an order
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

// Get the authenticated user's orders
export const getUserOrders = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/user/orders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// User cancels their own order
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
