import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-black text-gray-200 mb-4">403</h1>
      <h2 className="text-3xl font-bold text-black mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        You don't have permission to access this page. It might be restricted to a different user role.
      </p>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link to="/login">
          <Button variant="black">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
