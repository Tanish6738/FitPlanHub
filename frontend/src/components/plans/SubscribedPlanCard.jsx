import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import TrainerMiniCard from '../feed/TrainerMiniCard';

const SubscribedPlanCard = ({ subscription }) => {
  const plan = subscription.planId || subscription.plan || subscription; 

  if (!plan) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="p-6  ">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
             <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Active</span>
          </div>
          <span className="text-xs font-medium text-gray-500">
            Purchased on {new Date(subscription.createdAt || Date.now()).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-bold text-black mb-2 line-clamp-1">{plan.title}</h3>
        
        <div className="mb-6">
            <TrainerMiniCard trainer={plan.trainer || plan.trainerID} />
        </div>

        <div className="space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-bold text-black">0%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-black h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Link to={`/plans/${plan._id}`} className="block w-full">
          <Button variant="black" className="w-full">
            Continue Training
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubscribedPlanCard;
