import prisma from "../config/db.js";

class WishlistService {
  // Add product to wishlist
  async addToWishlist(userId, productId) {
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }

      // Check if the product exists
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error("Product not found");
      }

      // Check if the item already exists in the wishlist
      const existingItem = await prisma.wishlist.findFirst({
        where: { user_id: userId, product_id: productId },
      });
      if (existingItem) {
        throw new Error("Product already in wishlist");
      }

      // Create the wishlist item
      const wishlistItem = await prisma.wishlist.create({
        data: { user_id: userId, product_id: productId },
        include: { product: true }, // Include product details in response
      });

      return wishlistItem; // Return full wishlist item with product details
    } catch (error) {
      throw error;
    }
  }

  // Get all products in the wishlist for a user
  async getAllWishlistItems(userId) {
    try {
      const wishlistItems = await prisma.wishlist.findMany({
        where: {
          user_id: userId,
        },
        include: {
          product: {
            include: {
              images: true, // Includes product images
            },
          },
        },
      });
      return wishlistItems;
    } catch (error) {
      throw error;
    }
  }

  // Remove product from wishlist
  //   async removeFromWishlist(userId, productId) {
  //     try {
  //       const deletedItem = await prisma.wishlist.delete({
  //         where: {
  //           user_id_product_id: {
  //             user_id: userId,
  //             product_id: productId
  //           }
  //         }
  //       });
  //       return deletedItem;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async removeFromWishlist(userId, productId) {
    const result = await prisma.wishlist.deleteMany({
      where: {
        AND: [{ user_id: userId }, { product_id: productId }],
      },
    });

    // Return null if no items were deleted, otherwise return the result
    return result.count > 0 ? result : null;
  }
}

export default new WishlistService();
