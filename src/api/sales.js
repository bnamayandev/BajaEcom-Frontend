import axios from 'axios';

const API_URL = 'http://localhost:13000';

const getAuthToken = () => {
    return localStorage.getItem('authToken') || import.meta.env.VITE_DEV_TOKEN;
};

export const getSales = async () => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/sales`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const createSale = async (saleData) => {
    const token = getAuthToken();
    return axios.post(`${API_URL}/sales`, saleData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const getSaleById = async (id) => {
    const token = getAuthToken();
    return axios.get(`${API_URL}/sales/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const fulfillSale = async (id, staffSignoff) => {
    const token = getAuthToken();
    return axios.put(`${API_URL}/sales/${id}/fulfill`, { staff_signoff: staffSignoff }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};
