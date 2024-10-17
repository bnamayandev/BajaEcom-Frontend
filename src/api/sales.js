import axios from 'axios';

const API_URL = 'http://localhost:13000';

export const getSales = async (token) => {
    return axios.get(`${API_URL}/sales`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const createSale = async (saleData, token) => {
    return axios.post(`${API_URL}/sales`, saleData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const getSaleById = async (id, token) => {
    return axios.get(`${API_URL}/sales/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const fulfillSale = async (id, staffSignoff, token) => {
    return axios.put(`${API_URL}/sales/${id}/fulfill`, { staff_signoff: staffSignoff }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};