// src/components/ForgetPassword.js
import React, { useState } from 'react';

function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to reset the password (e.g., make an API call)
    console.log('Reset password for:', email);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">SpeedyIntervue</h1>
        <p>Reset your password</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            id="reset_email"
            name="reset_email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <a href="/login" className="text-sm hover:underline">
            Back to Login
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
