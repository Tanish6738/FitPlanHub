import React from 'react';

const SubscribeStatusBadge = ({ isSubscribed }) => {
  if (isSubscribed) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white border border-black">
        Subscribed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-300">
      Not Subscribed
    </span>
  );
};

export default SubscribeStatusBadge;
