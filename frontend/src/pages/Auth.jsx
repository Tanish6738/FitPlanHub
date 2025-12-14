import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-4xl font-bold mb-8">Welcome to FitPlanHub</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-300">Login</Link>
        <Link to="/register" className="px-6 py-3 border-2 border-black text-black font-semibold rounded hover:bg-gray-100 transition duration-300">Register</Link>
      </div>
    </div>
  )
}

export default Auth