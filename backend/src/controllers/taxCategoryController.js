import taxCategoryService from "../services/taxCategoryService.js";
import { errorHandler } from "../utils/errorHandler.js";

class TaxCategoryController {
  async getAllTaxCategories(req, res) {
    try {
      const taxCategories = await taxCategoryService.getAllTaxCategories();
      res.json(taxCategories);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async createTaxCategory(req, res) {
    try {
      const { name, standard_rate, description, is_active } = req.body;
      const newTaxCategory = await taxCategoryService.createTaxCategory({
        name,
        standard_rate: parseFloat(standard_rate),
        description,
        is_active: is_active ?? true
      });
      res.status(201).json(newTaxCategory);
    } catch (error) {
        errorHandler(error, req, res);
    }
  }

  async updateTaxCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, standard_rate, description, is_active } = req.body;
      const updatedTaxCategory = await taxCategoryService.updateTaxCategory(id, {
        name,
        standard_rate: standard_rate ? parseFloat(standard_rate) : undefined,
        description,
        is_active
      });
      res.json(updatedTaxCategory);
    } catch (error) {
        errorHandler(error, req, res);
    }
  }

  async deleteTaxCategory(req, res) {
    try {
      const { id } = req.params;
      await taxCategoryService.deleteTaxCategory(id);
      res.status(204).send();
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export default new TaxCategoryController();