import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user_context';
import Button from '../ui/Button';

const LogoutButton = ({ className = '' }) => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout} 
      className={`text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 ${className}`}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
