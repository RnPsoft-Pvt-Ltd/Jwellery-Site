// controllers/wishlistController.js

import wishlistService from '../services/wishlistService.js';

class WishlistController {
  // Add product to the wishlist
  async addToWishlist(req, res, next) {
    try {
      const userId = req.user.id; // Assuming user ID is stored in `req.user` (e.g., from authentication middleware)
      const { productId } = req.body; // Assuming userId and productId come from the request body
      if (!userId || !productId) {
        return res.status(400).json({ message: 'userId and productId are required' });
      }

      const wishlistItem = await wishlistService.addToWishlist(userId, productId);
      res.status(201).json(wishlistItem);
    } catch (error) {
      next(error);
    }
  }

  // Get all wishlist items for a user
  async getAllWishlistItems(req, res, next) {
    try {
      const userId = req.user.id; // Assuming user ID is stored in `req.user` (e.g., from authentication middleware)
      const wishlistItems = await wishlistService.getAllWishlistItems(userId);
      res.json(wishlistItems);
    } catch (error) {
      next(error);
    }
  }

  // Remove a product from the wishlist
  async removeFromWishlist(req, res, next) {
    try {
      const userId = req.user.id;
      const {productId} = req.body; // Extract productId from request params
      if (!productId) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const deletedItem = await wishlistService.removeFromWishlist(userId, productId);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Product not found in wishlist' });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new WishlistController();
