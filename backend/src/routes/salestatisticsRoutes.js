import express from "express";
import SalesStatisticsController from "../controllers/SalesStatisticsController.js";

const router = express.Router();

router.get("/sales/daily", SalesStatisticsController.getDailyOrders);
router.get("/sales/weekly", SalesStatisticsController.getWeeklyOrders);
router.get("/sales/monthly", SalesStatisticsController.getMonthlyOrders);

export default router;
