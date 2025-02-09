// src/routes/searchRoutes.js
import express from 'express';
import searchController from '../controllers/searchController.js'; 
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';
import searchValidation from '../utils/searchValidation.js'; 

const router = express.Router();

// Public routes
router.get('/products', 
  searchValidation.validateProductSearch,  // Add validation middleware
  searchController.searchProducts
);

// Admin routes
router.get('/admin/customers', 
  authenticate, 
  isAdmin, 
  searchValidation.validateCustomerSearch,  // Add validation middleware
  searchController.searchCustomers
);

router.get('/admin/orders', 
  authenticate, 
  isAdmin, 
  searchValidation.validateOrderSearch,  // Add validation middleware
  searchController.searchOrders
);

router.get('/admin/categories', 
  authenticate, 
  isAdmin, 
  searchController.searchCategories
);

router.get('/admin/coupons', 
  authenticate, 
  isAdmin, 
  searchController.searchCoupons
);

export default router;