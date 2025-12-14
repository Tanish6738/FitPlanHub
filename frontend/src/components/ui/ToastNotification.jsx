import React, { useEffect } from 'react';

const ToastNotification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300 ${types[type]}`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold hover:opacity-75">&times;</button>
      </div>
    </div>
  );
};

export default ToastNotification;
