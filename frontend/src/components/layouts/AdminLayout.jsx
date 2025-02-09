// Updated AdminLayout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { Loader2, Menu } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

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
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:w-64`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b">
          <div className="flex items-center px-4 py-3">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <AdminHeader />
          </div>
        </div>

        {/* Content Area */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;