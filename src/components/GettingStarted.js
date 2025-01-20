// src/components/GettingStarted.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function GettingStarted() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Welcome to SpeedyIntervue!</h1>
        <p className="mb-4">We are excited to help you streamline your hiring process.</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <p className="mt-2">To begin, you can either sign up for a new account or log in if you already have one.</p>
        <ul className="list-disc list-inside mt-2">
          <li>Fill in your details to create an account.</li>
          <li>Log in using your email and password.</li>
          <li>Select your role: Company, Interviewer, or User.</li>
        </ul>
      </div>
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={handleLogin}
          className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="ml-4 bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default GettingStarted;
