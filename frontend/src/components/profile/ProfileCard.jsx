import React from 'react';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white border border-black p-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-gray-100 border-2 border-black flex items-center justify-center text-4xl font-bold uppercase mb-6 rounded-full">
          {user.name ? user.name.charAt(0) : 'U'}
        </div>
        
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
          {user.name}
        </h1>
        
        <p className="text-gray-600 mb-4">{user.email}</p>
        
        <div className="inline-flex items-center px-3 py-1 border border-gray-200 bg-gray-50 text-sm font-bold uppercase tracking-wider mb-8">
          Role: {user.role} </div>

        {user.role === 'trainer' && (
          <div className="w-full border-t border-gray-100 pt-6 mt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-gray-500">Trainer Bio
              
            </h3>
            <p className="text-gray-800 leading-relaxed">
              {user.bio || 'No bio added yet.'}
            </p></div>
        )}</div>
    </div>
  );
};

export default ProfileCard;