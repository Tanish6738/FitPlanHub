import axios from '../axios/axios';

const subscribeToPlan = async (planId) => {
    const response = await axios.post(`/subscriptions/${planId}`);
    return response.data;
};

const getUserSubscriptions = async () => {
    const response = await axios.get('/subscriptions/my');
    return response.data;
};

const subscriptionService = {
    subscribeToPlan,
    getUserSubscriptions
};

export default subscriptionService;
