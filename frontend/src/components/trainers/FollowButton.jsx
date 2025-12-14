import React, { useState } from 'react';
import trainerService from '../../services/trainer.services';
import Button from '../ui/Button';
import ToastNotification from '../ui/ToastNotification';
import { useNavigate } from 'react-router-dom';

const FollowButton = ({ trainerId, isFollowing: initialIsFollowing, onToggleFollow, className = '' }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleToggleFollow = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (isFollowing) {
        await trainerService.unfollowTrainer(trainerId);
        setIsFollowing(false);
      } else {
        await trainerService.followTrainer(trainerId);
        setIsFollowing(true);
      }
      
      if (onToggleFollow) {
        onToggleFollow(!isFollowing);
      }
    } catch (err) {
      console.error( err);
      setError(err.response + 'Action failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleToggleFollow} 
        disabled={loading} 
        variant={isFollowing ? "outline" : "black"}
        className={className}
      >
        {loading ? 'Processing...' : (
          isFollowing ? 'Unfollow' : 'Follow')}
      </Button>
      {error && (
        <ToastNotification     message={error} 
          type="error"           onClose={() => setError(null)} 
        />
      )}
    </>
  );
};

export default FollowButton;
