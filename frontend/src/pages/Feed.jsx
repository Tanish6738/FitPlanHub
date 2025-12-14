import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FeedPlanCard from '../components/feed/FeedPlanCard';
import feedService from '../services/feed.services';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { useUser } from '../context/user_context';

const Feed = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === 'trainer') {
      navigate('/trainer/dashboard');
      return;
    }

    const fetchFeed = async () => {
      try {
        setLoading(true);
        const data = await feedService.getUserFeed();
        // Adjust based on actual API response structure
        setFeedItems(Array.isArray(data) ? data : data.feed || []);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
        setError('Failed to load your feed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Feed</h1>
          <p className="text-gray-600 mt-2">Updates from trainers you follow and your subscriptions.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="large" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : feedItems.length === 0 ? (
          <EmptyState 
            title="Your feed is empty" 
            message="Follow trainers or subscribe to plans to see them here."
            action={
              <div className="flex gap-4">
                 <Link to="/plans">
                    <Button variant="black">Browse Plans</Button>
                 </Link>
                 <Link to="/trainers">
                    <Button variant="outline">Find Trainers</Button>
                 </Link>
              </div>
            }
          />
        ) : (
          <div className="space-y-6">
            {feedItems.map((item) => (
             <FeedPlanCard key={item._id || item.id} plan={item} />
            ))}
          </div>
        )}
      </main>

      
    </div>
  );
};

export default Feed;
