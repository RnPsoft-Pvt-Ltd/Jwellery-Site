import express from 'express';
import salesController from '../controllers/salesController.js'; // Correct import for ES module
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js'; // Authentication and authorization middleware

const router = express.Router();

// Get all active sales (accessible by everyone)
router.get('/', salesController.getActiveSales);

// Admin only routes
router.post('/', authenticate, isAdmin, salesController.createSale);
router.put('/:id', authenticate, isAdmin, salesController.updateSale);
router.delete('/:id', authenticate, isAdmin, salesController.deleteSale);

export default router;
