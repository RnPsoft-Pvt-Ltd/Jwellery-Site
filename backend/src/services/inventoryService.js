import prisma from '../config/db.js'; // Prisma Client instance






class InventoryService {
  // Fetching all inventory
  async getAllInventory() {
    try {
      return await prisma.inventory.findMany();
    } catch (error) {
      throw new Error("Error fetching inventory: " + error.message);
    }
  }

  // Fetch inventory by ID
  async getInventoryById(product_variant_id) {
    try {
      return await prisma.inventory.findUnique({
        where: { product_variant_id },
      });
    } catch (error) {
      throw new Error("Error fetching inventory by ID: " + error.message);
    }
  }

  // Updating inventory
  async updateInventory(product_variant_id, data) {
    try {
      return await prisma.inventory.update({
        where: { product_variant_id },
        data,
      });
    } catch (error) {
      throw new Error("Error updating inventory: " + error.message);
    }
  }
}

export default InventoryService;

