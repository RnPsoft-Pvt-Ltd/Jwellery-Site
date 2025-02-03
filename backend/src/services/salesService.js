
import prisma from "../config/db.js";
// Prisma client instance

class SalesService {
  // Get all active sales
  async getActiveSales() {
    try {
      const sales = await prisma.sale.findMany({
        where: {
          is_active: true, // Only fetch active sales
        },
      });
      return sales;
    } catch (error) {
      console.error("Error in salesService.getActiveSales:", error.message);
      throw new Error("Failed to fetch active sales");
    }
  }

  // Create a sale
  async createSale(saleData) {
    try {
      const newSale = await prisma.sale.create({
        data: {
          name: saleData.name,
          description: saleData.description || null,
          start_date: new Date(saleData.start_date),
          end_date: new Date(saleData.end_date),
          is_active: saleData.is_active ?? true, // Default to true if not provided
        },
      });
      return newSale;
    } catch (error) {
      console.error("Error in salesService.createSale:", error.message);
      throw new Error("Failed to create sale");
    }
  }

  // Update a sale by ID
  async updateSale(id, saleData) {
    try {
      const updatedSale = await prisma.sale.update({
        where: { id: Number(id) },
        data: {
          name: saleData.name,
          description: saleData.description || null,
          start_date: new Date(saleData.start_date),
          end_date: new Date(saleData.end_date),
          is_active: saleData.is_active ?? true,
        },
      });
      return updatedSale;
    } catch (error) {
      console.error("Error in salesService.updateSale:", error.message);
      throw new Error("Failed to update sale");
    }
  }

  // Delete a sale by ID
  async deleteSale(id) {
    try {
      await prisma.sale.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error in salesService.deleteSale:", error.message);
      throw new Error("Failed to delete sale");
    }
  }
}

export default new SalesService();
