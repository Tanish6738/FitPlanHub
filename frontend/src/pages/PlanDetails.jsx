import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SubscribeButton from '../components/plans/SubscribeButton';
import AccessGuard from '../components/auth/AccessGuard';
import planService from '../services/plan.services';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import TrainerMiniCard from '../components/feed/TrainerMiniCard';

const PlanDetails = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const data = await planService.getPlanDetails(planId);
      setPlan(data.plan || data); 
      
      if (data.message === "Subscribe to view full details") {
        setIsSubscribed(false);
      } else {
        setIsSubscribed(true);
      }
    } catch (err) {
      console.error("Failed to fetch plan details:", err);
      setError('Failed to load plan details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

  const handleSubscribeSuccess = () => {
    setIsSubscribed(true);
    fetchPlanDetails();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center">
          <Loader size="large" />
        </div>
        
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <ErrorMessage message={error || 'Plan not found'} />
        </div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header Section */}
        <div className="mb-8 border-b border-gray-100 pb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {isSubscribed && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-black text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                    {plan.level}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {plan.duration || Math.ceil((plan.durationInDays || 0) / 7)} Weeks
                  </span>
                </div>
              )}
              <h1 className="text-4xl font-black text-black mb-4 leading-tight">
                {plan.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Created by</span>
                <TrainerMiniCard trainer={plan.trainer || plan.trainerID} />
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <div className="text-3xl font-black text-black">
                ${plan.price}
              </div>
              {!isSubscribed && (
                <SubscribeButton 
                  planId={plan._id} 
                  onSubscribeSuccess={handleSubscribeSuccess}
                  className="w-full md:w-auto px-8 py-3"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {isSubscribed ? (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">About this Plan</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {plan.description}
                  </p>
                </section>

                <div className="space-y-8 animate-fade-in">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-3 text-green-800 font-medium">
                      <span className="text-xl">✓</span>
                      You have full access to this plan
                    </div>
                  </div>

                  <section>
                    <h2 className="text-2xl font-bold text-black mb-4">Workout Schedule</h2>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      {plan.content ? (
                        <div className="p-6 prose max-w-none">
                          <p className="whitespace-pre-wrap">{plan.content}</p>
                        </div>
                      ) : (
                        <div className="p-6 text-gray-500 italic">
                          Detailed schedule content will appear here.
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mt-8">
                <div className="mb-4 text-4xl">🔒</div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Subscribe to Unlock Full Access
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Get access to the complete workout schedule, detailed exercises, and nutrition guide included in this plan.
                </p>
                <SubscribeButton 
                  planId={plan._id} 
                  onSubscribeSuccess={handleSubscribeSuccess}
                  className="px-8"
                />
              </div>
            )}
          </div>

          {isSubscribed && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-bold text-black mb-4">Plan Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    {plan.duration} Week Program
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    {plan.level} Difficulty
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    Full Body Workouts
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    Trainer Support
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      
    </div>
  );
};

export default PlanDetails;
