import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PlanPreviewCard from '../components/plans/PlanPreviewCard';
import planService from '../services/plan.services';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

const PlansGrid = ({ plans, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!plans?.length) {
    return (
      <div className="mt-12">
        <EmptyState 
          title="No plans active" 
          message="Our trainers are crafting new routines. Check back shortly." 
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {plans.map((plan) => (
        <PlanPreviewCard key={plan._id || plan.id} plan={plan} />
      ))}
    </div>
  );
};


const Landing = () => {
  const [plansData, setPlansData] = useState({
    list: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedPlans = async () => {
      try {
        const response = await planService.getAllPlans();
        
        if (isMounted) {
          const plansList = Array.isArray(response) ? response : (response.plans || []);
          
          setPlansData({
            list: plansList,
            isLoading: false,
            error: null
          });
        }
      } catch (err) {
        console.error("LandingPage: Error loading plans", err);
        if (isMounted) {
          setPlansData({
            list: [],
            isLoading: false,
            error: 'Unable to load fitness plans. Please refresh or try again later.'
          });
        }
      }
    };

    loadFeaturedPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black tracking-tight">Latest Drops</h2>
            <p className="mt-2 text-gray-500">Fresh workout routines added this week.</p>
          </div>
          <Link to="/plans" className="hidden md:block text-sm font-semibold text-black hover:underline underline-offset-4">
            View All Plans &rarr;
          </Link>
        </div>

        <PlansGrid 
          plans={plansData.list} 
          loading={plansData.isLoading} 
          error={plansData.error} 
        />
        
        <div className="mt-12 text-center md:hidden">
           <Link to="/plans" className="text-sm font-semibold text-black hover:underline underline-offset-4">
            View All Plans &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;