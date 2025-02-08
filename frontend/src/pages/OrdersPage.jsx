// import React from 'react';
// import AccountSidebar from '../components/layout/AccountSidebar';
// import Header from '../components/layout/Header';
// function OrdersPage() {
//   const orders = [
//     {
//       id: "001",
//       date: "2023-19-12",
//       amount: "Rs.9999",
//       status: "Pending",
//       canCancel: true,
//     },
//     {
//       id: "002",
//       date: "2023-19-12",
//       amount: "Rs.9999",
//       status: "Delivered",
//     },
//     {
//       id: "003",
//       date: "2023-19-12",
//       amount: "Rs.9999",
//       status: "Delivered",
//     },
//     {
//       id: "004",
//       date: "2023-19-12",
//       amount: "Rs.9999",
//       status: "Delivered",
//     },
//     {
//       id: "005",
//       date: "2023-19-12",
//       amount: "Rs.9999",
//       status: "Delivered",
//     },
//     {
//       id: "006",
//       date: "2023-19-12",
//       amount: "Rs.9999",
//       status: "Delivered",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//     <Header />
//     <div className="flex gap-8">
//       <AccountSidebar />
//       <div className="flex-1">
//         <h1 className="text-2xl font-bold mb-8">My Account</h1>
//         <h2 className="text-xl font-semibold mb-6">Order History</h2>
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order.id} className="border rounded-lg p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <div className="font-medium">Order #{order.id}</div>
//                   <div className="text-sm text-gray-600">{order.date}</div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-medium">{order.amount}</div>
//                   <div className="text-sm text-gray-600">{order.status}</div>
//                 </div>
//               </div>
//               {order.canCancel && (
//                 <div className="mt-4 space-x-2 flex justify-end text-sm ">
//                   <button className="px-4 py-2 border rounded hover:bg-gray-100">
//                     Cancel
//                   </button>
//                   <button className="text-blue-600 hover:underline">
//                     Track Order
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default OrdersPage;




"use client"

import { useState } from "react"
import OrderTracking from "../components/OrderTracking"
import CancelOrderForm from "../components/CancelOrderForm"
import ReturnForm from "../components/ReturnForm"
import ProductReview from "../components/ProductReview"

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showCancelForm, setShowCancelForm] = useState(false)
  const [showReturnForm, setShowReturnForm] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const orders = [
    {
      id: "001",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Pending",
      canCancel: true,
      items: [
        { name: "Ring", quantity: 2, price: 20000 },
        { name: "Necklace", quantity: 3, price: 10000 },
      ],
      trackingId: "123xyz123333",
      shippingAddress: {
        street: "Starcity, Near Bus Stand",
        city: "Bhuneswar",
        state: "Patia",
        pincode: "12345",
        contact: "9800000000",
      },
    },
    {
      id: "002",
      date: "2023-19-12",
      amount: "Rs.9999",
      status: "Delivered",
      canReview: true,
      items: [{ name: "Gold Ring", quantity: 1, price: 9999 }],
    },
    // ... other orders
  ]

  const handleTrackOrder = (order) => {
    setSelectedOrder(order)
    setShowCancelForm(false)
    setShowReturnForm(false)
    setShowReviewForm(false)
  }

  const handleCancelOrder = (order) => {
    setSelectedOrder(order)
    setShowCancelForm(true)
    setShowReturnForm(false)
    setShowReviewForm(false)
  }

  const handleReturnOrder = (order) => {
    setSelectedOrder(order)
    setShowReturnForm(true)
    setShowCancelForm(false)
    setShowReviewForm(false)
  }

  const handleReviewProduct = (order) => {
    setSelectedOrder(order)
    setShowReviewForm(true)
    setShowCancelForm(false)
    setShowReturnForm(false)
  }

  const handleCloseAllForms = () => {
    setShowCancelForm(false)
    setShowReturnForm(false)
    setShowReviewForm(false)
    setSelectedOrder(null)
  }

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <h2 className="text-xl font-semibold mb-6">Order History</h2>

        {/* Forms and Tracking */}
        {selectedOrder && (
          <div className="mb-8">
            {showCancelForm && <CancelOrderForm orderId={selectedOrder.id} onCancel={handleCloseAllForms} />}
            {showReturnForm && <ReturnForm orderId={selectedOrder.id} onCancel={handleCloseAllForms} />}
            {showReviewForm && (
              <ProductReview
                orderId={selectedOrder.id}
                productId={selectedOrder.items[0].id}
                productName={selectedOrder.items[0].name}
                onSubmit={handleCloseAllForms}
              />
            )}
            {!showCancelForm && !showReturnForm && !showReviewForm && (
              <OrderTracking
                orderId={selectedOrder.id}
                status={selectedOrder.status.toLowerCase()}
                trackingId={selectedOrder.trackingId}
                items={selectedOrder.items}
                shippingAddress={selectedOrder.shippingAddress}
              />
            )}
          </div>
        )}

        {/* Orders List */}
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
              <div className="mt-4 space-x-2 flex justify-end text-sm">
                <button className="px-4 py-2 border rounded hover:bg-gray-100" onClick={() => handleTrackOrder(order)}>
                  Track Order
                </button>
                {order.canCancel && (
                  <button
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Cancel
                  </button>
                )}
                {order.status === "Delivered" && (
                  <>
                    <button
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                      onClick={() => handleReturnOrder(order)}
                    >
                      Return/Replace
                    </button>
                    {order.canReview && (
                      <button
                        className="px-4 py-2 text-blue-600 hover:underline"
                        onClick={() => handleReviewProduct(order)}
                      >
                        Write Review
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage

