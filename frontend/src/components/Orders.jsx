import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

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
        const response = await axios.get(
          "https://api.shopevella.com/v1/orders/admin/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setFilteredOrders(response.data);
          console.log(response.data)
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
    if (!orders.length) return;

    let filtered = [...orders];

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((order) =>
        order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (paymentStatus) {
      filtered = filtered.filter(
        (order) =>
          order.payment_status.toLowerCase() === paymentStatus.toLowerCase()
      );
    }

    if (shipmentStatus) {
      filtered = filtered.filter(
        (order) =>
          order.shipment_status.toLowerCase() === shipmentStatus.toLowerCase()
      );
    }

    setFilteredOrders(filtered);
  }, [searchQuery, paymentStatus, shipmentStatus, orders]);

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 gap-4">
              <input
                type="text"
                placeholder="Search customer email..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="">Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={shipmentStatus}
                onChange={(e) => setShipmentStatus(e.target.value)}
              >
                <option value="">Shipment Status</option>
                <option value="Shipped">Shipped</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
              </select>
            </div>
            <button
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => {
                setSearchQuery("");
                setPaymentStatus("");
                setShipmentStatus("");
                setFilteredOrders(orders);
              }}
            >
              Clear filters
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      ORDER NUMBER
                    </th>
                    <th  className="p-4 text-left text-sm font-medium text-gray-600">
                      Order Produts
                    </th>
  <th  className="p-4 text-left text-sm font-medium text-gray-600">
                      Delivery Address
                    </th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">
                      DATE
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      CUSTOMER EMAIL
                    </th>
                     <th className="p-4 text-left text-sm font-medium text-gray-600">
                      CUSTOMER Phone
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      SHIPMENT STATUS
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      PAYMENT STATUS
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          {order.order_number || "N/A"}
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          {order.order_items.map(x=>{return(
                            <text   className="p-2 text-blue-600 hover:underline cursor-pointer"
 onClick={()=>{window.location.href=`https://shopevella.com/products/${x.product_variant.product_id}`}}>
                            {x.product_variant.product_id}
                            </text>
                          )})}
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          {order?.address?.replaceAll("null,","")?.replaceAll("undefined,","")}
                          </td>

                        <td className="p-4 text-sm text-gray-600">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {order.customer_email || "N/A"}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {order.phone || "N/A"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              order.shipment_status === "Shipped"
                                ? "bg-green-100 text-green-800"
                                : order.shipment_status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {"Pending"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                 "bg-green-100 text-green-800"
                                                             `}
                          >
                            {"Paid"}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          Rs. {order.total?order.total:total_amount?.toFixed(2) || "0.00"}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-6 text-center text-sm text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
