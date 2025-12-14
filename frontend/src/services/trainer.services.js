import axios from '../axios/axios';

const followTrainer = async (trainerId) => {
    const response = await axios.post(`/trainers/${trainerId}/follow`);
    return response.data;
};

const unfollowTrainer = async (trainerId) => {
    const response = await axios.delete(`/trainers/${trainerId}/unfollow`);
    return response.data;
};

const getFollowedTrainers = async () => {
    const response = await axios.get('/trainers/following');
    return response.data;
};

const getTrainerProfile = async (trainerId) => {
    const response = await axios.get(`/trainers/${trainerId}/profile`);
    return response.data;
};

const trainerService = {
    followTrainer,
    unfollowTrainer,
    getFollowedTrainers,
    getTrainerProfile
};

export default trainerService;
