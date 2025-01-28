import React from 'react';
import AccountSidebar from '../components/layout/AccountSidebar';
import Header from '../components/layout/Header';

function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <div className="flex gap-8">
      <AccountSidebar />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <h2 className="text-xl font-semibold mb-6">Overview</h2>
        <div className="space-y-6">
          {['Name', 'Email', 'Primary Mobile Number', 'Password'].map((item) => (
            <div key={item} className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">{item}</div>
                <div>{item === 'Password' ? '***********' : 'Jhondoe'}</div>
              </div>
              <button className="px-4 py-2 border rounded hover:bg-gray-100">
                Edit
              </button>
            </div>
          ))}
          <button className="w-full mt-8 px-4 py-2 border rounded hover:bg-gray-100">
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AccountPage;