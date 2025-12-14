import React from 'react';
import Button from '../ui/Button';

const TrainerPlanCard = ({ plan, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg hover:border-black transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-black mb-1">{plan.title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>${plan.price}</span>
            <span>•</span>
            <span>{plan.durationInDays} days</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
        {plan.description}
      </p>
      
      <div className="flex gap-3 mt-auto">
        <Button 
          variant="outline" 
          className="flex-1 text-sm py-2"
          onClick={() => onEdit(plan)}
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 text-sm py-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          onClick={() => onDelete(plan._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TrainerPlanCard;
