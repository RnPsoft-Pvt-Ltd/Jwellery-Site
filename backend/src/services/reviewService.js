import prisma from "../config/db.js";

class ReviewService {
  async createReview(reviewData) {
    const { userId, productId, rating, comment } = reviewData;

    // Check if user has already reviewed this product
    const existingReview = await prisma.productReview.findUnique({
      where: {
        unique_user_product_review: {
          user_id: userId,
          product_id: productId,
        },
      },
    });

    if (existingReview) {
      throw new Error("User has already reviewed this product");
    }

    // Create the review
    return prisma.productReview.create({
      data: {
        user_id: userId,
        product_id: productId,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getReviews(productId, page, limit) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.productReview.findMany({
        where: {
          product_id: productId,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
      }),
      prisma.productReview.count({
        where: {
          product_id: productId,
        },
      }),
    ]);

    return {
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getReviewById(id) {
    return prisma.productReview.findUnique({
      where: { id },
    });
  }

  async deleteReview(id) {
    return prisma.productReview.delete({
      where: { id },
    });
  }
}

export default new ReviewService();
