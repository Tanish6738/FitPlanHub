import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import trainerService from '../services/trainer.services';
import TrainerHeader from '../components/trainers/TrainerHeader';
import TrainerPlanList from '../components/trainers/TrainerPlanList';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

const TrainerProfile = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        setLoading(true);
        const profileData = await trainerService.getTrainerProfile(trainerId);
        setTrainer(profileData.trainer);
        setPlans(profileData.plans || []);
        setIsFollowing(profileData.isFollowing || false);
      } catch (err) {
        console.error("Error fetching trainer profile:", err);
        setError("Failed to load trainer profile. The trainer might not exist.");
      } finally {
        setLoading(false);
      }
    };

    if (trainerId) {
      fetchTrainerData();
    }
  }, [trainerId]);

  const handleToggleFollow = (newStatus) => {
    setIsFollowing(newStatus);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 p-8">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate(-1)} 
        variant="link" 
        className="mb-6 pl-0 text-gray-500 hover:text-black"
      >
        ← Back
      </Button>
      
      <TrainerHeader 
        trainer={trainer} 
        isFollowing={isFollowing} 
        onToggleFollow={handleToggleFollow} 
      />
      
      <div className="mt-12">
        <TrainerPlanList plans={plans} />
      </div>
    </div>
  );
};

export default TrainerProfile;
