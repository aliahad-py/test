// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loginFlag, setLoginFlag] = useState(false);
  const navigate = useNavigate();
  
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', visible: false });
    }, 2000);
  };
  
  const [ip, setIp] = useState("");
  const fetchIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginFlag === false){
      setLoginFlag(true);
      const Data = {
        "email": email,
        "password": password,
        "type": role,
      };
      try {
        fetchIP();
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {"Content-Type": "application/json",
                    "X-Forwarded-For": ip},
          credentials: "include",
          body: JSON.stringify(Data),
        });
        if (!response.ok) {
          const responseData = await response.json();
          showNotification(responseData.detail, 'failed');
        } else {
          const responseData = await response.json();
          console.log(responseData)
          showNotification(responseData.message, 'success');
          navigate("/home");
        }
      } catch (error) {
        console.error("Request failed", error);
      }
      setLoginFlag(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
    {/* Notification Section */}
    {notification.visible && (
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
        {notification.message}
      </div>
    )}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">SpeedyIntervue</h1>
        <p>Streamline Your Hiring Process</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            required
            minLength="8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-2 flex justify-center">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              required
              id="user"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="user">User</label>
            <input
              type="radio"
              required
              id="company"
              name="role"
              value="company"
              checked={role === "company"}
              onChange={(e) => setRole(e.target.value)}
              className="ml-4 mr-2"
            />
            <label htmlFor="company">Company</label>
            <input
              type="radio"
              required
              id="interviewer"
              name="role"
              value="interviewer"
              checked={role === "interviewer"}
              onChange={(e) => setRole(e.target.value)}
              className="ml-4 mr-2"
            />
            <label htmlFor="interviewer">Interviewer</label>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <a href="/reset" className="text-sm hover:underline">
            Forgot Password?
          </a>
          <a href="/signup" className="text-sm hover:underline">
            Sign Up
          </a>
        </div>
        <button 
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
