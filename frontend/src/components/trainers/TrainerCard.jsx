import React from 'react';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

const TrainerCard = ({ trainer, onUnfollow }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 flex flex-col items-center text-center hover:border-black transition-colors duration-300">
      <Link to={`/trainers/${trainer._id}`} className="mb-4 group">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold border border-gray-200 group-hover:border-black transition-colors mx-auto mb-3 overflow-hidden">
          {trainer.profileImage ? (
            <img src={trainer.profileImage} alt={trainer.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 group-hover:text-black">{trainer.fullName?.charAt(0) || 'T'}</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-black group-hover:underline decoration-2 underline-offset-4">
          {trainer.fullName}
        </h3>
      </Link><p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wide">
        {trainer.expertise || 'Fitness Trainer'}
      </p>
      
      <p className="text-gray-600 text-sm mb-6 line-clamp-2 h-10">
        {trainer.bio || 'No bio available.'}
      </p><FollowButton 
        trainerId={trainer._id} 
        isFollowing={true} 
        onToggleFollow={(isFollowing) => {
            if (!isFollowing && onUnfollow) {
                onUnfollow(trainer._id);
            }
        }}
        className="w-full"
      />
    </div>
  );
};

export default TrainerCard;
