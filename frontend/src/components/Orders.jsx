// Orders.jsx
import React from "react";

const Orders = () => {
  return (
    <div className="px-60 py-20 bg-gray-100 min-h-screen rounded-lg shadow-lg p-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Payment Status Dropdown */}
        <select
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Payment Status</option>
          <option>Paid</option>
          <option>Unpaid</option>
        </select>

        {/* Shipment Status Dropdown */}
        <select
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Shipment Status</option>
          <option>Shipped</option>
          <option>Pending</option>
        </select>

        {/* Clear Filter Button */}
        <button className="text-blue-500 underline">Clear filter</button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th className="p-4">ORDER NUMBER</th>
              <th className="p-4">DATE</th>
              <th className="p-4">CUSTOMER EMAIL</th>
              <th className="p-4">SHIPMENT STATUS</th>
              <th className="p-4">PAYMENT STATUS</th>
              <th className="p-4">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty State */}
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                There is no order to display
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select className="border border-gray-300 rounded-md px-2 py-1">
            <option>20</option>
            <option>10</option>
            <option>50</option>
          </select>
          <span>per page</span>
        </div>

        <div className="text-gray-500">
          <span>0 records</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md">1</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;


