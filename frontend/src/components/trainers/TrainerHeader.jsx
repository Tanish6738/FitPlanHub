import React from 'react';
import FollowButton from './FollowButton';

const TrainerHeader = ({ trainer, isFollowing, onToggleFollow }) => {
  if (!trainer) return null;

  return (
    <div className="bg-white border border-black p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-100 border border-black flex items-center justify-center text-3xl font-bold uppercase">
            {trainer.fullName ? trainer.fullName.charAt(0) : 'T'}
          </div>          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tighter mb-2">{trainer.fullName}</h1>
            <p className="text-gray-600 mb-1">{trainer.email}</p>
            <div className="flex gap-4 text-sm font-medium mt-3">
              <span className="bg-gray-100 px-3 py-1 border border-gray-200">
                {trainer.expertise || 'Fitness Trainer'}
              </span>            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <FollowButton              trainerId={trainer._id} 
            isFollowing={isFollowing} 
            onToggleFollow={onToggleFollow}
            className="w-full md:w-auto" />
        </div>
      </div>
      
      {trainer.bio && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">About</h3>
          <p className="text-gray-800 leading-relaxed max-w-3xl">
            {trainer.bio}</p>
        </div>
      )}   </div>
  );
};

export default TrainerHeader;
