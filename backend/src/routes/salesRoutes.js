import express from 'express';
import salesController from '../controllers/salesController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Routes - Accessible by everyone
router.get('/', salesController.getActiveSales);
router.get('/:id', salesController.getActiveSalesById);

// Admin Only Routes
router.post('/',  salesController.createSale);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

// Routes for Adding/Removing Products in Sales
router.post('/:saleId/add-product', salesController.addProductToSale);
router.delete('/:saleId/remove-product/:productId', salesController.removeProductFromSale);

export default router;