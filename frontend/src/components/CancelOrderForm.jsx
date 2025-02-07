"use client"

import { useState } from "react"

const CANCEL_REASONS = [
  "Changed my mind",
  "Ordered by mistake",
  "Found a better price elsewhere",
  "Shipping time too long",
  "Other",
]

function CancelOrderForm({ orderId, onCancel }) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: reason === "Other" ? customReason : reason,
        }),
      })

      onCancel()
    } catch (error) {
      console.error("Failed to cancel order:", error)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Cancel Order</h2>
          <p className="text-gray-600">Please tell us why you want to cancel this order</p>
        </div>

        <div className="space-y-2">
          {CANCEL_REASONS.map((r) => (
            <div key={r} className="flex items-center space-x-2">
              <input
                type="radio"
                id={r}
                name="cancelReason"
                value={r}
                checked={reason === r}
                onChange={(e) => setReason(e.target.value)}
                className="form-radio"
              />
              <label htmlFor={r} className="text-sm">
                {r}
              </label>
            </div>
          ))}
        </div>

        {reason === "Other" && (
          <div className="space-y-2">
            <label htmlFor="custom-reason" className="block text-sm font-medium">
              Please specify
            </label>
            <textarea
              id="custom-reason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Tell us more..."
              required
              className="w-full px-3 py-2 text-sm border rounded-md"
              rows={3}
            />
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
            Cancel Order
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Keep Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default CancelOrderForm

