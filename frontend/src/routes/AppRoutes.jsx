import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Auth from '../pages/Auth.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Landing from '../pages/Landing.jsx'
import Feed from '../pages/Feed.jsx'
import Plans from '../pages/Plans.jsx'
import PlanDetails from '../pages/PlanDetails.jsx'
import Subscriptions from '../pages/Subscriptions.jsx'
import TrainerProfile from '../pages/TrainerProfile.jsx'
import FollowingTrainers from '../pages/FollowingTrainers.jsx'
import TrainerDashboard from '../pages/TrainerDashboard.jsx'
import Profile from '../pages/Profile.jsx'
import Unauthorized from '../pages/Unauthorized.jsx'
import NotFound from '../pages/NotFound.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/plans/:planId" element={<PlanDetails />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/trainers/following" element={<FollowingTrainers />} />
      <Route path="/trainers/:trainerId" element={<TrainerProfile />} />
      <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AppRoutes