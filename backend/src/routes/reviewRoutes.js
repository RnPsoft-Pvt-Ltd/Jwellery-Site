import express from "express";
import reviewController from "../controllers/reviewController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", reviewController.getProductReviews);
router.get("/all", reviewController.getAllProductReviews);
router.post("/", authenticate, reviewController.addReview);
router.delete("/:id", authenticate,reviewController.deleteReview);

export default router;
