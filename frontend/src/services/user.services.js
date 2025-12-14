import axios from '../axios/axios';

export const getUserProfile = async () => {
    const response = await axios.get('/users/profile');
    return response.data;
};
