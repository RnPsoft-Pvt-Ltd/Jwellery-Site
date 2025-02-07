"use client"

import { useState } from "react"
import { ImagePlus } from "lucide-react"

const RETURN_REASONS = [
  "Broken Product",
  "Wrong Size",
  "Different from description",
  "Quality not as expected",
  "Other",
]

function ReturnForm({ orderId, onCancel }) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("reason", reason === "Other" ? customReason : reason)
    images.forEach((image) => formData.append("images", image))

    try {
      await fetch(`/api/orders/${orderId}/return`, {
        method: "POST",
        body: formData,
      })

      onCancel()
    } catch (error) {
      console.error("Failed to initiate return:", error)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Return or Replace Item</h2>
          <p className="text-gray-600">Please tell us why you want to return this item</p>
        </div>

        <div className="space-y-2">
          {RETURN_REASONS.map((r) => (
            <div key={r} className="flex items-center space-x-2">
              <input
                type="radio"
                id={r}
                name="returnReason"
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Add Photos</label>
          <div className="flex gap-4">
            <button
              type="button"
              className="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
              onClick={() => document.getElementById("image-upload").click()}
            >
              <ImagePlus className="h-8 w-8 text-gray-400" />
            </button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            {images.map((image, index) => (
              <div key={index} className="h-24 w-24 rounded-lg border bg-gray-100">
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Submit Return Request
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReturnForm

