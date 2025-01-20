// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [ip, setIp] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState('user');
  const [signupFlag, setSignupFlag] = useState(false);
  const navigate = useNavigate();
  
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  
  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', visible: false });
    }, 2000);
  };
  const handleRoleChange = (newRole) => {
    if (role !== newRole){
      setRole(newRole);
      setFirstName('');
      setLastName('');
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordError('');
    }
  };
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
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    var Data = {}
    if (signupFlag === false){
      setSignupFlag(true);
    
      if (role === "user" || role==="interviewer"){
          Data = {
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "password": password,
            "type": role,
          };
      }else if (role === "company"){
          Data = {
            "fullname": fullName,
            "company": companyName,
            "email": email,
            "password": password,
            "type": role,
          };
      }
      try {
        fetchIP();
        const response = await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: {"Content-Type": "application/json",
                    "X-Forwarded-For": ip},
          body: JSON.stringify(Data),
        });

        if (!response.ok) {
          const responseData = await response.json();
          showNotification(responseData.detail, 'failed');
        } else {
          const responseData = await response.json();
          showNotification(responseData.message, 'success');
          navigate("/login");
        }
      } catch (error) {
        console.error("Request failed", error);
      }
      setSignupFlag(false);
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
        <p>Create Your Account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex" hidden={role!=="user" && role!=="interviewer"}>
          <input
            type="text"
            required={role==="user" && role==="interviewer"}
            hidden={role!=="user" && role!=="interviewer"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            required={role==="user" && role==="interviewer"}
            hidden={role!=="user" && role!=="interviewer"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ml-4"
          />
        </div>
        <div className="flex" hidden={role!=="company"}>
          <input
            type="text"
            required={role==="company"}
            hidden={role!=="company"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            required={role==="company"}
            hidden={role!=="company"}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ml-4"
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            required
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            required
            minLength="6"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {passwordError && (
        <div className="text-red-500 text-sm mb-2">{passwordError}</div>
      )}
        
        <div className="mb-4 flex justify-center">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              required
              id="user"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => handleRoleChange(e.target.value)}
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
              onChange={(e) => handleRoleChange(e.target.value)}
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
              onChange={(e) => handleRoleChange(e.target.value)}
              className="ml-4 mr-2"
            />
            <label htmlFor="interviewer">Interviewer</label>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <a href="/login" className="text-sm hover:underline">
            Already have an account? Login
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
