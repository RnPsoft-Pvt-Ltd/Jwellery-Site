import express from "express";
import productController from "../controllers/productController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/variants", productController.getProductVariants);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Admin routes
router.post("/", authenticate, isAdmin, productController.createProduct);

export default router;
