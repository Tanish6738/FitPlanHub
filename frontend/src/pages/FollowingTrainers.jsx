import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TrainerCard from '../components/trainers/TrainerCard';
import trainerService from '../services/trainer.services';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { useUser } from '../context/user_context';

const FollowingTrainers = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === 'trainer') {
      navigate('/trainer/dashboard');
      return;
    }

    const fetchFollowing = async () => {
      try {
        setLoading(true);
        const data = await trainerService.getFollowedTrainers();
        setTrainers(Array.isArray(data) ? data : data.trainers || []);
      } catch (err) {
        console.error("Failed to fetch followed trainers:", err);
        setError('Failed to load followed trainers.');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  const handleUnfollow = (trainerId) => {
    setTrainers(prevTrainers => prevTrainers.filter(t => t._id !== trainerId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-black text-black uppercase tracking-tight">Following</h1>
          <p className="text-gray-600 mt-2">Trainers you are currently following.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="large" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : trainers.length === 0 ? (
          <EmptyState 
            title="You are not following anyone yet" 
            message="Follow trainers to see their latest plans and updates in your feed."
            action={
              <Link to="/plans">
                <Button variant="black">Browse Plans to Find Trainers</Button>
              </Link>            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trainers.map(trainer => (
              <TrainerCard 
                key={trainer._id} 
                trainer={trainer} 
                onUnfollow={handleUnfollow}/>
            ))}
          </div>
        )}
      </main>

      
    </div>
  );
};

export default FollowingTrainers;
