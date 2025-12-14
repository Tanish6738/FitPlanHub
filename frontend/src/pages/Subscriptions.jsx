import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SubscribedPlanCard from '../components/plans/SubscribedPlanCard';
import subscriptionService from '../services/subscription.services';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { useUser } from '../context/user_context';

const Subscriptions = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === 'trainer') {
      navigate('/trainer/dashboard');
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const data = await subscriptionService.getUserSubscriptions();
        setSubscriptions(Array.isArray(data) ? data : data.subscriptions || []);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        setError('Failed to load your subscriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-black">My Subscriptions</h1>
          <p className="text-gray-600 mt-2">Manage and track your active fitness plans.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="large" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : subscriptions.length === 0 ? (
          <EmptyState 
            title="No active subscriptions" 
            message="You haven't subscribed to any plans yet. Start your journey today!"            action={
              <Link to="/plans">
                <Button variant="black">Browse Plans</Button>              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptions.map((sub) => (
              <SubscribedPlanCard key={sub._id || sub.id} subscription={sub} />
            ))}
          </div>
        )}
      </main>

      
    </div>
  );
};

export default Subscriptions;
