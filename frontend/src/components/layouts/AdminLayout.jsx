// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/AdminSidebar';
import Header from './components/Header';
import { Loader2 } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (!userData || userData.role !== 'ADMIN') {
          navigate('/login', { 
            replace: true,
            state: { from: location.pathname }
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-grow p-6 pt-20 transition-all duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;