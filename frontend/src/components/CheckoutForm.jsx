

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderDetails = {
      paymentMethod,
      items: [
        { name: "Ring", quantity: 2, price: 20000 },
        { name: "Necklace", quantity: 3, price: 10000 },
      ],
      shippingAddress: {
        address: "Starcity, Near Bus Stand",
        city: "Patia, Bhuneswar",
        zip: "12345",
        country: "India",
        contact: "9800000000",
      },
    };

    try {
      const response = await fetch("https://api.shopevella.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => navigate("/"), 2000); // Redirect after success
      } else {
        alert(data.error || "Order failed!");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="credit" checked={paymentMethod === "credit"} onChange={() => setPaymentMethod("credit")} />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                <span>COD (Check Availability)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                <span>UPI</span>
              </label>
            </div>
          </div>

          {paymentMethod === "credit" && (
            <div className="space-y-4">
              <div>
                <label className="block">Card Number</label>
                <input type="text" className="border px-2 py-1 rounded w-full" placeholder="1234-1234-1234-1234" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Expiry Date</label>
                  <input type="text" className="border px-2 py-1 rounded w-full" placeholder="MM/YY" required />
                </div>
                <div>
                  <label className="block">CVV</label>
                  <input type="text" className="border px-2 py-1 rounded w-full" placeholder="123" required />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg h-fit">
        <h2 className="text-lg font-medium mb-4">Order Details</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Items</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ring x2</span>
                <span>Rs.20000</span>
              </div>
              <div className="flex justify-between">
                <span>Necklace x3</span>
                <span>Rs.10000</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">
              Starcity, Near Bus Stand
              <br />
              Patia, Bhuneswar - 12345
              <br />
              India
              <br />
              Contact No. : 9800000000
            </p>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Order Placed Successfully!</h2>
            <p>Your order has been placed successfully. Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
}
