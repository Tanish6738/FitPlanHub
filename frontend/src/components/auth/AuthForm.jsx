import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const AuthForm = ({ title, children, footerText, footerLink }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <Link variant="" to="/" className="bg-black text-white hover:bg-gray-800 focus:ring-gray-500 px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer absolute top-4 left-4">
          Home
        </Link>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">

          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-black text-black tracking-tighter">
              FITPLAN<span className="text-gray-400">HUB</span>
            </h2>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
        
        <div className="mt-8 space-y-6">
          {children}
        </div>

        {footerText && footerLink && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {footerText}{' '}
              <Link to={footerLink.to} className="font-medium text-black hover:underline">
                {footerLink.text}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
