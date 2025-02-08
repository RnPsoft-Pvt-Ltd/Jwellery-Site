// services/taxCategoryService.js
import prisma from '../config/db.js';

class TaxCategoryService {
  async getAllTaxCategories() {
    try {
      return await prisma.taxCategory.findMany({
        orderBy: {
          name: 'asc'
        }
      });
    } catch (error) {
      throw new Error(`Failed to fetch tax categories: ${error.message}`);
    }
  }

  async createTaxCategory(data) {
    try {
      return await prisma.taxCategory.create({
        data: {
          name: data.name,
          standard_rate: data.standard_rate,
          description: data.description,
          is_active: data.is_active
        }
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('A tax category with this name already exists');
      }
      throw new Error(`Failed to create tax category: ${error.message}`);
    }
  }

  async updateTaxCategory(id, data) {
    try {
      return await prisma.taxCategory.update({
        where: { id },
        data: {
          name: data.name,
          standard_rate: data.standard_rate,
          description: data.description,
          is_active: data.is_active
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Tax category not found');
      }
      throw new Error(`Failed to update tax category: ${error.message}`);
    }
  }

  async deleteTaxCategory(id) {
    try {
      // Check if tax category is being used by any products
      const productsUsingCategory = await prisma.product.count({
        where: { tax_category_id: id }
      });

      if (productsUsingCategory > 0) {
        throw new Error('Cannot delete tax category as it is being used by products');
      }

      return await prisma.taxCategory.delete({
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Tax category not found');
      }
      throw error;
    }
  }
}

export default new TaxCategoryService();

