import express from "express";
import productController from "../controllers/productController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/variants", productController.getProductVariants);

// Admin routes
router.post("/", authenticate, isAdmin, productController.createProduct);
router.put("/:id", authenticate, isAdmin, productController.updateProduct);
router.delete("/:id", authenticate, isAdmin, productController.deleteProduct);

export default router;
