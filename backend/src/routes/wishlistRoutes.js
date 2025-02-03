import express from 'express';
import wishlistController from '../controllers/wishlistController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Import middleware

const router = express.Router();

// 🔐 Protect all routes by requiring authentication

// POST /wishlist - Add product to wishlist (Authenticated users only)
router.post('/', authenticate, wishlistController.addToWishlist);

// GET /wishlist - Get all wishlist items for the logged-in user (Authenticated users only)
router.get('/', authenticate, wishlistController.getAllWishlistItems);

// DELETE /wishlist/:id - Remove product from wishlist (Authenticated users only)
router.delete('/:id', authenticate, wishlistController.removeFromWishlist);

export default router;
