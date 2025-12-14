import React from 'react';
import { Link } from 'react-router-dom';
import TrainerMiniCard from './TrainerMiniCard';
import SubscribeStatusBadge from './SubscribeStatusBadge';
import Button from '../ui/Button';

const FeedPlanCard = ({ plan }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 mb-6">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <TrainerMiniCard trainer={plan.trainer} /> 
     <SubscribeStatusBadge isSubscribed={plan.isSubscribed} />
        </div>

        <Link to={`/plans/${plan._id}`} className="block group">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black group-hover:underline decoration-2 underline-offset-4">
            {plan.title}
          </h3>
<p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {plan.description}
          </p>
        </Link>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
 <div className="flex space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="mr-1 font-semibold text-black">{plan.duration || Math.ceil((plan.durationInDays || 0) / 7)}</span> weeks
            </span>
            <span className="flex items-center">
              <span className="mr-1 font-semibold text-black">{plan.level}</span> level
            </span>
     </div>
          
          <div className="flex items-center gap-3">
             <span className="font-bold text-lg">${plan.price}</span>
             <Link to={`/plans/${plan._id}`}>
                <Button variant="outline" className="text-xs py-1 px-3">
                    View </Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPlanCard;
