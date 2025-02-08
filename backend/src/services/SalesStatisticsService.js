import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SalesStatisticsService {
  static async getOrdersByDay() {
    return await prisma.order.groupBy({
      by: ["order_date"],
      _count: { id: true },
      where: {
        order_date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // Today
        },
      },
    });
  }

  static async getOrdersByWeek() {
    return await prisma.order.groupBy({
      by: ["order_date"],
      _count: { id: true },
      where: {
        order_date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
        },
      },
    });
  }

  static async getOrdersByMonth() {
    return await prisma.order.groupBy({
      by: ["order_date"],
      _count: { id: true },
      where: {
        order_date: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Last 1 month
        },
      },
    });
  }
}

export default SalesStatisticsService;
