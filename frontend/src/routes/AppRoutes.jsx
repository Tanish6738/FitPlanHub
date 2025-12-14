import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Auth from '../pages/Auth.jsx'
import Login from '../components/login.jsx'
import Register from '../components/register.jsx'
import Landing from '../pages/Landing.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes