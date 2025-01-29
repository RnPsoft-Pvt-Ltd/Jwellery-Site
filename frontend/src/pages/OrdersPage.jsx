import React from 'react';
import AccountSidebar from '../components/layout/AccountSidebar';
import Header from '../components/layout/Header';
function OrdersPage() {
  const orders = [
    {
      id: "001",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Pending",
      canCancel: true,
    },
    {
      id: "002",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Delivered",
    },
    {
      id: "003",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Delivered",
    },
    {
      id: "004",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Delivered",
    },
    {
      id: "005",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Delivered",
    },
    {
      id: "006",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <div className="flex gap-8">
      <AccountSidebar />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">{order.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{order.amount}</div>
                  <div className="text-sm text-gray-600">{order.status}</div>
                </div>
              </div>
              {order.canCancel && (
                <div className="mt-4 space-x-2 flex justify-end text-sm ">
                  <button className="px-4 py-2 border rounded hover:bg-gray-100">
                    Cancel
                  </button>
                  <button className="text-blue-600 hover:underline">
                    Track Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default OrdersPage;