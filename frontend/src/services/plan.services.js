import axios from '../axios/axios';

const getAllPlans = async () => {
    const response = await axios.get('/plans');
    return response.data;
};

const getPlanDetails = async (planId) => {
    const response = await axios.get(`/plans/${planId}`);
    return response.data;
};

const createPlan = async (planData) => {
    const response = await axios.post('/plans', planData);
    return response.data;
};

const updatePlan = async (planId, planData) => {
    const response = await axios.put(`/plans/${planId}`, planData);
    return response.data;
};

const deletePlan = async (planId) => {
    const response = await axios.delete(`/plans/${planId}`);
    return response.data;
};

const planService = {
    getAllPlans,
    getPlanDetails,
    createPlan,
    updatePlan,
    deletePlan
};

export default planService;
