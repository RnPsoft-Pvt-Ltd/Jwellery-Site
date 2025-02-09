import express from "express";
import DashboardController from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/lifetime-sales", DashboardController.getLifetimeSales);

export default router;
