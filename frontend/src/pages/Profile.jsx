import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProfileCard from '../components/profile/ProfileCard';
import LogoutButton from '../components/profile/LogoutButton';
import { useUser } from '../context/user_context';
import Loader from '../components/ui/Loader';

const Profile = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className=" flex justify-center items-center">
          <Loader size="large" />
        </div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full  ">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-black uppercase tracking-tight">My Profile</h1>
        </div>

        <ProfileCard user={user} />

        <div className="mt-8 flex justify-center">
          <LogoutButton className="w-full max-w-xs" />
        </div>
      </main>

      
    </div>
  );
};

export default Profile;
