"use client"

import { useState } from "react"
import { Star, ImagePlus } from "lucide-react"

function ProductReview({ orderId, productId, productName, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("rating", rating.toString())
    formData.append("review", review)
    images.forEach((image) => formData.append("images", image))

    try {
      await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        body: formData,
      })

      onSubmit()
    } catch (error) {
      console.error("Failed to submit review:", error)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Review {productName}</h2>
          <p className="text-gray-600">Share your experience with this product</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="text-2xl focus:outline-none">
                <Star className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="review" className="block text-sm font-medium">
            Your Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you like or dislike about this product?"
            required
            className="w-full px-3 py-2 text-sm border rounded-md"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Add Photos</label>
          <div className="flex gap-4">
            <button
              type="button"
              className="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
              onClick={() => document.getElementById("review-image-upload").click()}
            >
              <ImagePlus className="h-8 w-8 text-gray-400" />
            </button>
            <input
              id="review-image-upload"
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

        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Submit Review
        </button>
      </form>
    </div>
  )
}

export default ProductReview

