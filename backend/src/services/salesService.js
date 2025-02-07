
import prisma from "../config/db.js";
// Prisma client instance

class SalesService {
  // Get all active sales
  async getActiveSales() {
    try {
      const sales = await prisma.sale.findMany({
        where: {
          is_active: true,
        },
        include: {
          sale_products: {
            include: {
              product: true, // Include the product details
            },
          },
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
      const { products, ...saleDetails } = saleData;
  
      // Validate that all product IDs exist
      for (const product of products) {
        const existingProduct = await prisma.product.findUnique({
          where: { id: product.product_id },
        });
  
        if (!existingProduct) {
          throw new Error(`Product with ID ${product.product_id} does not exist`);
        }
      }
  
      // Create the sale
      const newSale = await prisma.sale.create({
        data: {
          ...saleDetails,
          start_date: new Date(saleDetails.start_date),
          end_date: new Date(saleDetails.end_date),
          is_active: saleDetails.is_active ?? true,
          sale_products: {
            create: products.map((product) => {
              let saleProductData = {
                product: { connect: { id: product.product_id } },
              };
  
              // Only include discount fields if they have a value
              if (product.discount_percent !== null && product.discount_percent !== undefined) {
                saleProductData.discount_percent = product.discount_percent;
              }
              if (product.discount_amount !== null && product.discount_amount !== undefined) {
                saleProductData.discount_amount = product.discount_amount;
              }
  
              return saleProductData;
            }),
          },
        },
        include: {
          sale_products: true,
        },
      });
  
      return newSale;
    } catch (error) {
      console.error("Error in salesService.createSale:", error);
      throw new Error("Failed to create sale");
    }
  }
  


  // Update a sale by ID
  async updateSale(id, saleData) {
    try {
      const { products, ...saleDetails } = saleData;

      // First, update the sale details
      const updatedSale = await prisma.sale.update({
        where: { id },
        data: {
          ...saleDetails,
          start_date: new Date(saleDetails.start_date),
          end_date: new Date(saleDetails.end_date),
          is_active: saleDetails.is_active ?? true,
        },
      });

      // If products are provided, update the sale-product mappings
      if (products && Array.isArray(products)) {
        // Delete existing mappings
        await prisma.saleProductMapping.deleteMany({
          where: { sale_id: id },
        });

        // Create new mappings
        await prisma.saleProductMapping.createMany({
          data: products.map((product) => ({
            sale_id: id,
            product_id: product.product_id,
            discount_percent: product.discount_percent,
            discount_amount: product.discount_amount,
          })),
        });
      }

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
