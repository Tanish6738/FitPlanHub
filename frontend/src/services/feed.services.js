import axios from '../axios/axios';

const getUserFeed = async () => {
    const response = await axios.get('/feed');
    return response.data;
};

const feedService = {
    getUserFeed
};

export default feedService;
