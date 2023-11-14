import axios from 'axios';
import { buildPath } from './paths';

export const api = axios.create({
    baseURL: buildPath(import.meta.env.VITE_APP_BACKEND_URL, '/api'),
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
