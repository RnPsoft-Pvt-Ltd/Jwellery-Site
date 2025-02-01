// src/routes/cartRoutes.js
import express from "express";
import cartController from "../controllers/cartController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, cartController.addToCart);
router.get("/", authenticate, cartController.getCart);
router.put("/:id", authenticate, cartController.updateCartItem);
router.delete("/:id", authenticate, cartController.removeFromCart);


export default router;
