import salesService from '../services/salesService.js';

class SalesController {
  // Get all active sales
  async getActiveSales(req, res) {
    try {
      const sales = await salesService.getActiveSales();
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sales", error: error.message });
    }
  }

  // Create a sale
  async createSale(req, res) {
    try {
      const saleData = req.body;
      console.log("Sale Data:", saleData); // Debugging log
  
      // Validate that products are provided
      if (!saleData.products || !Array.isArray(saleData.products)) {
        return res.status(400).json({ message: "Products array is required" });
      }
  
      const newSale = await salesService.createSale(saleData);
      console.log("Created Sale:", newSale); // Debugging log
      res.status(201).json(newSale);
    } catch (error) {
      console.error("Error in salesController.createSale:", error.message);
  
      if (error.message.includes("does not exist")) {
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: "Failed to create sale", error: error.message });
    }
  }


  // Update a sale by ID
  async updateSale(req, res) {
    try {
      const { id } = req.params;
      const saleData = req.body;
      const updatedSale = await salesService.updateSale(id, saleData);
      res.status(200).json(updatedSale);
    } catch (error) {
      res.status(500).json({ message: "Error updating sale", error: error.message });
    }
  }

  // Delete a sale by ID
  async deleteSale(req, res) {
    try {
      const { id } = req.params;
      await salesService.deleteSale(id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: "Error deleting sale", error: error.message });
    }
  }
}

export default new SalesController();
