// import DashboardService from "../services/dashboard.service.js";

import DashboardService from "../services/dashboardService.js";

class DashboardController {
  static async getLifetimeSales(req, res) {
    try {
      const salesData = await DashboardService.getLifetimeSalesData();
      res.status(200).json(salesData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default DashboardController;

