import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("http://localhost:5000/v1/orders/admin/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setFilteredOrders(response.data);
        } else {
          setError("Failed to fetch orders. Please try again later.");
        }
      } catch (err) {
        setError("Error fetching orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (!orders.length) return; // Prevent filtering on an empty list

    let filtered = [...orders];

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((order) =>
        order.order_number?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (paymentStatus) {
      filtered = filtered.filter((order) => order.payment_status.toLowerCase() === paymentStatus.toLowerCase());
    }

    if (shipmentStatus) {
      filtered = filtered.filter((order) => order.shipment_status.toLowerCase() === shipmentStatus.toLowerCase());
    }

    console.log("Filtered Orders:", filtered); // Debugging logs
    setFilteredOrders(filtered);
  }, [searchQuery, paymentStatus, shipmentStatus, orders]);

  return (
    <div className="px-60 py-20 ml-24 bg-gray-100 min-h-screen rounded-lg shadow-lg p-4">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="">Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <select
  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  value={shipmentStatus}
  onChange={(e) => setShipmentStatus(e.target.value)}
>
  <option value="">Shipment Status</option>
  <option value="Shipped">Shipped</option>
  <option value="Pending">Pending</option>
  <option value="Processing">Processing</option> {/* Fix here */}
</select>


        <button className="text-blue-500 underline" onClick={() => {
          setSearchQuery("");
          setPaymentStatus("");
          setShipmentStatus("");
          setFilteredOrders(orders); // Reset to original orders
        }}>
          Clear filter
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="overflow-x-auto border border-gray-300 rounded-lg w-[calc(100%-50px)] ml-auto">
        <table className="w-auto text-left border-collapse">
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4 border-b">
                    <input type="checkbox" className="form-checkbox" />
                  </td>
                  <td className="p-4 border-b">{order.order_number || "N/A"}</td>
                  <td className="p-4 border-b">{order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}</td>
                  <td className="p-4 border-b">{order.customer_email || "N/A"}</td>
                  <td className="p-4 border-b">{order.shipment_status || "N/A"}</td>
                  <td className="p-4 border-b">{order.payment_status || "N/A"}</td>
                  <td className="p-4 border-b">{order.total ? `$${order.total}` : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  There is no order to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
          <span>{filteredOrders.length} records</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md">1</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
