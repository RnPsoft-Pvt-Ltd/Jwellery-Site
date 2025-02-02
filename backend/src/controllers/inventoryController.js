import InventoryService from "../services/inventoryService.js";

class InventoryController {
  constructor() {
    this.inventoryService = new InventoryService();
    this.getInventory = this.getInventory.bind(this); // Bind methods
    this.updateInventory = this.updateInventory.bind(this);
  }

  async getInventory(req, res) {
    try {
      const inventory = await this.inventoryService.getAllInventory(); // Use `this.inventoryService`
      res.status(200).json(inventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      res.status(500).json({ error: "Failed to fetch inventory" });
    }
  }

  async updateInventory(req, res) {
    try {
      const { id } = req.params;
      const { total_quantity, reserved_quantity, minimum_stock_alert } = req.body;

      const updatedInventory = await this.inventoryService.updateInventory(id, {
        total_quantity,
        reserved_quantity,
        minimum_stock_alert,
      });

      return res.status(200).json(updatedInventory);
    } catch (error) {
      console.error("Error updating inventory:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new InventoryController();
