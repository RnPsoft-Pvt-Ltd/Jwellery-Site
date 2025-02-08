import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem('token');
  
  // Redirect to account if already logged in
  if (isAuthenticated) {
    return <Navigate to="/account" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <main className="w-full max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;