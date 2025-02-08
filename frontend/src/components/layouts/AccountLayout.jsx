// src/layouts/AccountLayout.jsx
import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import AccountSidebar from './components/AccountSidebar';
import Footer from './components/Footer';

const AccountLayout = () => {
  const navigate = useNavigate();
  
  // Check for user auth here
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        <AccountSidebar />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AccountLayout;
