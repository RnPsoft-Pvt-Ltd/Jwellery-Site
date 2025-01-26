import React from "react";
import Footer from "../components/Footer"; // Adjust the import path as needed

export default function CartPage() {
  return (
    <div className="flex flex-col h-screen"> {/* Full-page layout */}
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
      <main className="flex flex-col items-center justify-center h-[60%] px-6 py-12"> {/* 60% height */}
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
          Continue Shopping
        </button>
      </main>

      {/* Footer */}
      <div className="h-[40%]"> {/* 40% height */}
        <Footer />
      </div>
    </div>
  );
}
