import React, { useState, useEffect } from 'react';
import {   Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedRegisteredUsers = localStorage.getItem('registeredUsers');
    return savedRegisteredUsers ? JSON.parse(savedRegisteredUsers) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const handleLogin = (userData) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const foundUser = registeredUsers.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleRegister = (userData) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    registeredUsers.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    setRegisteredUsers(registeredUsers);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdate = (updatedData) => {
    const updatedUsers = registeredUsers.map((u) =>
      u.email === user.email ? updatedData : u
    );
    setRegisteredUsers(updatedUsers);
    setUser(updatedData);
  };

  return (
  <div>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/account" element={user ? <Account user={user} onLogout={handleLogout} onUpdate={handleUpdate} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/account" : "/register"} />} />
      </Routes>
      </div>
  );
}

export default App;
