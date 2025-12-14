import axios from '../axios/axios';

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/users/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
