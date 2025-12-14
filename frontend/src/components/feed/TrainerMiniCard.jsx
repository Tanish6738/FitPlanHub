import React from 'react';
import { Link } from 'react-router-dom';

const TrainerMiniCard = ({ trainer }) => {
  if (!trainer) return null;

  return (
    <Link to={`/trainers/${trainer._id}`} className="flex items-center group">
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300 group-hover:border-black transition-colors">
        {trainer.profileImage ? (
          <img src={trainer.profileImage} alt={trainer.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-gray-600 group-hover:text-black">
            {trainer.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900 group-hover:text-black group-hover:underline decoration-1 underline-offset-2">
          {trainer.name}
        </p>
        <p className="text-xs text-gray-500">Trainer</p>
      </div>
    </Link>
  );
};

export default TrainerMiniCard;
