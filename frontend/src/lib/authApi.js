import apiClient from "./apiClient";

export const loginApi = async (payload) => {
    const res = await apiClient.post('/auth/login', payload);
    return res.data;
};

export const registerApi = async (payload) => {
    const res = await apiClient.post('/auth/register', payload);
    return res.data;
};

export const logoutApi = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export const getTokenFromStorage = () => { return localStorage.getItem('token'); };
export const saveTokenToStorage = (token) => { localStorage.setItem('token', token); };
export const isAuthenticated = () => { return !!localStorage.getItem('token'); };