import SalesStatisticsService from "../services/SalesStatisticsService.js";

class SalesStatisticsController {
  static async getDailyOrders(req, res) {
    try {
      const dailyOrders = await SalesStatisticsService.getOrdersByDay();
      res.json({ dailyOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getWeeklyOrders(req, res) {
    try {
      const weeklyOrders = await SalesStatisticsService.getOrdersByWeek();
      res.json({ weeklyOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMonthlyOrders(req, res) {
    try {
      const monthlyOrders = await SalesStatisticsService.getOrdersByMonth();
      res.json({ monthlyOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SalesStatisticsController;
