import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import GettingStarted from './components/GettingStarted';
import ForgetPassword from './components/ForgetPassword';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GettingStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
