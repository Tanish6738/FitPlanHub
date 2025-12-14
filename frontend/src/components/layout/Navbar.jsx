import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useUser } from '../../context/user_context';

const Navbar = () => {
  const { user } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "text-white border-b-2 border-white" : "text-gray-300 hover:text-white";
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8" onClick={closeMobileMenu}>
              <span className="text-2xl font-bold tracking-tighter">FitPlanHub</span>
            </Link>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/plans" className={`text-sm font-medium transition-colors py-1 ${isActive('/plans')}`}>
                Plans
              </Link>
              
              {user && (
                <>
                  {user.role === 'user' && (
                    <>
                      <Link to="/feed" className={`text-sm font-medium transition-colors py-1 ${isActive('/feed')}`}>
                        Feed
                      </Link>
                      
                      <Link to="/subscriptions" className={`text-sm font-medium transition-colors py-1 ${isActive('/subscriptions')}`}>
                        My Subscriptions
                      </Link>

                      <Link to="/trainers/following" className={`text-sm font-medium transition-colors py-1 ${isActive('/trainers/following')}`}>
                        Following
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'trainer' && (
                    <Link to="/trainer/dashboard" className={`text-sm font-medium transition-colors py-1 ${isActive('/trainer/dashboard')}`}>
                      Dashboard
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Auth/Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Link to="/profile">
                  <div className="flex items-center gap-3 hover:bg-gray-900 px-3 py-2 rounded-md transition-colors">
                    <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm uppercase">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <span className="text-sm font-medium">
                      {user.name}
                    </span>
                  </div>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="black" className="border border-gray-700 hover:border-white">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="white">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/plans" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900"
              onClick={closeMobileMenu}
            >
              Plans
            </Link>
            
            {user ? (
              <>
                {user.role === 'user' && (
                  <>
                    <Link 
                      to="/feed" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900"
                      onClick={closeMobileMenu}
                    >
                      Feed
                    </Link>
                    
                    <Link 
                      to="/subscriptions" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900"
                      onClick={closeMobileMenu}
                    >
                      My Subscriptions
                    </Link>

                    <Link 
                      to="/trainers/following" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900"
                      onClick={closeMobileMenu}
                    >
                      Following
                    </Link>
                  </>
                )}
                
                {user.role === 'trainer' && (
                  <Link 
                    to="/trainer/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                )}

                <div className="border-t border-gray-800 mt-4 pt-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm uppercase mr-3">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    {user.name}
                  </Link>
                </div>
              </>
            ) : (
              <div className="mt-4 space-y-2 px-3">
                <Link to="/login" onClick={closeMobileMenu} className="block w-full">
                  <Button variant="black" className="w-full border border-gray-700">Login</Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="block w-full">
                  <Button variant="white" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
