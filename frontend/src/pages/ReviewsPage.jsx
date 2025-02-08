import React, { useState, useEffect } from "react";
import axios from "axios";



export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/reviews/all"
        );

        const selectedReviews = response.data.data.reviews;

        // Format testimonials
        const formattedReviews = selectedReviews.map((reviews, index) => ({
          id: index + 1,
          author: reviews.user.name,
          rating: reviews.rating,
          comment: reviews.comment,
        }));

        setReviews(formattedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <div className="w-full py-12 px-2 md:px-24 bg-contain bg-[url('https://storage.googleapis.com/jwelleryrnpsoft/testimonials.png')] h-fit">
        <div className="w-full mx-auto z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center font-albert pb-[50px] border-black border-b-4">
            Reviews
          </h1>
          {reviews.length > 0
            ? reviews.map((review, index) => (
                <div className="rounded-lg h-fit border-black border-b-4 border-x-black border-x-4 pb-3">
                  <p className="text-yellow-500 text-center text-[48px]">
                    {"★".repeat(review.rating)}
                  </p>
                  <p className="text-gray-700 text-center mb-6 md:text-lg max-[365px]:text-sm text-base font-albert">
                    "{review.comment}"
                  </p>

                  <p className="text-gray-900 font-semibold text-center font-albert text-xl max-[365px]:text-md">
                    {review.author}
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
