// routes/taxCategoryRoutes.js
import express from "express";
import taxCategoryController from "../controllers/taxCategoryController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', authenticate, isAdmin, taxCategoryController.getAllTaxCategories);
router.post('/', authenticate, isAdmin,taxCategoryController.createTaxCategory);
router.put('/:id', authenticate, isAdmin, taxCategoryController.updateTaxCategory);
router.delete('/:id', authenticate, isAdmin,taxCategoryController.deleteTaxCategory);

export default router;