import React, { useState } from 'react';
import subscriptionService from '../../services/subscription.services';
import Button from '../ui/Button';
import ToastNotification from '../ui/ToastNotification';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user_context';

const SubscribeButton = ({ planId, onSubscribeSuccess, className = '' }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (user && user.role === 'trainer') {
    return null;
  }

  const handleSubscribe = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await subscriptionService.subscribeToPlan(planId);
      if (onSubscribeSuccess) {
        onSubscribeSuccess();
      }
    } catch (err) {
      console.error("Subscription failed:", err);
      setError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleSubscribe} 
        disabled={loading} 
        variant="black"
        className={className}
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </Button>
      {error && (
        <ToastNotification 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}
    </>
  );
};

export default SubscribeButton;
