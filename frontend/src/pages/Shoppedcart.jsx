//import React from "react";
import Footer from "../components/Footer"; // Adjust the import path as needed

export default function ShoppingCartPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-lg font-semibold hover:underline">
            Collection
          </a>
          <a href="#" className="text-lg font-semibold hover:underline">
            About Us
          </a>
        </div>
        <img
          src="https://storage.googleapis.com/jwelleryrnpsoft/logo.png"
          alt="Logo"
          className="h-10"
        />
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-500">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3H1v18h22V3zM2 4h20v16H2V4zm9 14h2v-5h-2v5zm1-6.268a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
          <button className="hover:text-gray-500">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a7 7 0 00-7 7c0 7 7 13 7 13s7-6 7-13a7 7 0 00-7-7zM4 9a8 8 0 0116 0c0 8-8 15-8 15S4 17 4 9z"></path>
            </svg>
          </button>
          <button className="hover:text-gray-500">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 5H8v2h8V5zM4 9h16v2H4V9zm6 8h4v-2h-4v2z"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow px-6 py-12">
        {/* Cart Items Section */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg p-4 bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                {/* Replace this URL with your Google Cloud Storage public URL */}
                <img
                  src="https://storage.googleapis.com/jwelleryrnpsoft/earring.png.png"  // Public URL of your image
                  alt="Product"
                  className="w-20 h-20 rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">Silver Braided Earrings</h2>
                  <p className="text-sm text-gray-500">1 Qty.</p>
                </div>
              </div>

              {/* Adjusted Section for Quantity and Buttons */}
              <div className="flex items-center space-x-4">
                {/* Quantity (you can customize this with actual functionality later) */}
                <p className="text-lg font-bold">Qty: 1</p>

                <div className="flex items-center space-x-2">
                  <button className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800">
                    Add to Cart
                  </button>
                  <button className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="flex justify-between text-lg">
            <p>Subtotal</p>
            <p>Rs. 2000</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>Shipping</p>
            <p>Rs. 99</p>
          </div>
          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>Rs. 2099</p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="promocode"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
              Apply
            </button>
          </div>
          <button className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </main>

      {/* Footer */}
      <div className="h-[20%]">
        <Footer />
      </div>
    </div>
  );
}
