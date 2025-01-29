import reviewService from "../services/reviewService.js";
import { AppError, errorHandler, catchAsync } from "../utils/errorHandler.js";

class ReviewController {
  async addReview(req, res) {
    try {
      const { productId, rating, comment } = req.body;
      const userId = req.user.id; // Assuming user is set by auth middleware

      if (!productId || !rating) {
        return res.status(400).json({
          success: false,
          message: "Product ID and rating are required",
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }

      const review = await reviewService.createReview({
        userId,
        productId,
        rating,
        comment,
      });

      res.status(201).json({
        success: true,
        data: review,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async getProductReviews(req, res) {
    try {
      const { productId, page = 1, limit = 10 } = req.query;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const reviews = await reviewService.getReviews(
        productId,
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Assuming user is set by auth middleware

      const review = await reviewService.getReviewById(id);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      // Check if the user is the owner of the review
      if (review.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to delete this review",
        });
      }

      await reviewService.deleteReview(id);

      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export default new ReviewController();
