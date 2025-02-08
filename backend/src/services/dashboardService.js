import prisma from "../config/db.js";
// import prisma from "../config/prismaClient.js";

class DashboardService {
  static async getLifetimeSalesData() {
    try {
      const totalOrders = await prisma.order.count();
      const totalSales = await prisma.order.aggregate({
        _sum: { total_amount: true }
      });

      const completedOrders = await prisma.order.count({
        where: { status: "DELIVERED" }
      });

      const cancelledOrders = await prisma.order.count({
        where: { status: "CANCELLED" }
      });

      const completedPercentage = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
      const cancelledPercentage = totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;

      return {
        totalOrders,
        totalSales: totalSales._sum.total_amount || 0,
        completedPercentage: completedPercentage.toFixed(2),
        cancelledPercentage: cancelledPercentage.toFixed(2),
      };
    } catch (error) {
      throw new Error("Error fetching lifetime sales data: " + error.message);
    }
  }
}

export default DashboardService;
