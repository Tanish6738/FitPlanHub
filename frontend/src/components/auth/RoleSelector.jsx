import React from 'react';

const RoleSelector = ({ selectedRole, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">I am a:</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange('user')}
          className={`py-3 px-4 text-center rounded-md border transition-all duration-200 ${
            selectedRole === 'user'
              ? 'bg-black text-white border-black ring-2 ring-offset-2 ring-gray-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          User
        </button>
        <button
          type="button"
          onClick={() => onChange('trainer')}
          className={`py-3 px-4 text-center rounded-md border transition-all duration-200 ${
            selectedRole === 'trainer'
              ? 'bg-black text-white border-black ring-2 ring-offset-2 ring-gray-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Trainer
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
