import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useUser } from '../../context/user_context';

const PlanPreviewCard = ({ plan }) => {
  const { user } = useUser();

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-black transition-colors duration-300 flex flex-col h-full group">
      <div className="p-6 ">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-black line-clamp-1 group-hover:underline decoration-2 underline-offset-4">{plan.title}</h3>
          <span className="bg-black text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
            {plan.level || 'All Levels'}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
          {plan.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-800 font-medium mb-6 space-x-4">
          <div className="flex items-center">
            <span className="mr-2">⏱</span>
            <span>{plan.duration || Math.ceil((plan.durationInDays || 0) / 7)} weeks</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">👤</span>
            {plan.trainer ? (
              <Link 
                to={`/trainers/${typeof plan.trainer === 'object' ? plan.trainer._id : plan.trainer}`}
                className="hover:underline hover:text-black transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {plan.trainerName || (typeof plan.trainer === 'object' ? plan.trainer.name : 'Trainer')}
              </Link>
            ) : (
              <span>{plan.trainerName || 'Trainer'}</span>
            )}
          </div>
        </div>
        
        <div className="text-2xl font-black text-black mb-2">
          ${plan.price}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 group-hover:bg-white transition-colors">
        {
          user ? (
            <Link to={`/plans/${plan._id}`} className="block w-full">
          <Button variant="black" className="w-full">
            View Details
          </Button>
        </Link>):(
            <Link to="/register" className="block w-full">
          <Button variant="black" className="w-full">
            Register to View
          </Button>
        </Link>
        )
        }
      </div>
    </div>
  );
};

export default PlanPreviewCard;
