/**
 * src/services/api.js - Axios base instance for MOV Stay
 * All API calls use this instance for consistent base URL and token injection.
 */

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor – attach JWT from localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('movstay_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor – handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('movstay_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
