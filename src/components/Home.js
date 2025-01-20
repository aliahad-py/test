// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const [role, setRole] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [ip, setIp] = useState("");

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', visible: false });
    }, 2000);
  };

  // Fetch IP address
  const fetchIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  // Check cookies and navigate if necessary
  const checkCookies = () => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    const userRole = cookies['R'];
    const sessionTokenValue = cookies['ST'];

    if (!userRole || !sessionTokenValue) {
      navigate('/login');
    } else {
      setRole(userRole);
      setSessionToken(sessionTokenValue);
    }
  };

  // Run on component mount
  //useEffect(() => {
  //  fetchIP();
  //  checkCookies();
  //}, []);

  // Form submission handler
  //const handleSubmit = async (event) => {
    // event.preventDefault();
    // Add form handling logic if needed
  //};
  checkCookies();
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
      {/* Notification Section */}
      {notification.visible && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <h1 className="text-xl font-semibold">Welcome Home</h1>
      <p>Your IP Address: {ip}</p>
      <p>Role: {role}</p>
      <p>Session Token: {sessionToken}</p>
    </div>
  );
}

export default Home;
