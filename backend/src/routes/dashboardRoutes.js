import express from "express";
import DashboardController from "../controllers/dashboardController.js";
// import DashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/lifetime-sales", DashboardController.getLifetimeSales);

export default router;
