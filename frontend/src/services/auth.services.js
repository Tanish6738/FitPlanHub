import axios from '../axios/axios';

const registerUser = async (userData) => {
    const response = await axios.post('/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

const loginUser = async (userData) => {
    const response = await axios.post('/auth/login', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

const logoutUser = async () => {
    try {
        await axios.post('/auth/logout');
    } catch (error) {
        console.error("Logout error", error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getToken = () => {
    return localStorage.getItem('token');
};

const authService = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getToken
};

export default authService;
