import { PrismaClient, Prisma } from "@prisma/client"; // ✅ Import Prisma
import prisma from "../config/db.js"; // ✅ Ensure this is correctly set up

class SalesService {
  // Get all active sales
  async getActiveSales() {
    try {
      const sales = await prisma.sale.findMany({
        where: { is_active: true },
        include: {
          sale_products: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      });
      return sales;
    } catch (error) {
      console.error("Error in salesService.getActiveSales:", error);
      throw new Error("Failed to fetch active sales");
    }
  }

  // Get active sale by ID
  async getActiveSalesById(id) {
    try {
      const sale = await prisma.sale.findUnique({
        where: { id },
        include: {
          sale_products: {
            include: {
              product: {
                include: {
                  images: true,
                  variants: true,
                  product_metadata: true,
                },
              },
            },
          },
        },
      });

      if (!sale || !sale.is_active) {
        throw new Error("Sale not found or inactive");
      }

      return sale;
    } catch (error) {
      console.error("Error in salesService.getActiveSalesById:", error);
      throw new Error("Failed to fetch sale details");
    }
  }

  // Create a sale
  async createSale(saleData) {
    try {
      console.log("Creating Sale with Data:", JSON.stringify(saleData, null, 2));

      const newSale = await prisma.sale.create({
        data: {
          name: saleData.name,
          description: saleData.description || "",
          start_date: new Date(saleData.start_date),
          end_date: new Date(saleData.end_date),
          is_active: saleData.is_active ?? true,
          thumbnail: saleData.thumbnail || null,
          sale_products: {
            create: saleData.products.map((product) => ({
              product_id: product.product_id,
              discount_percent: new Prisma.Decimal(product.discount_percent || 0), // ✅ Fix Prisma.Decimal usage
              discount_amount: new Prisma.Decimal(product.discount_amount || 0),
            })),
          },
        },
        include: {
          sale_products: true,
        },
      });

      console.log("Sale Created Successfully:", JSON.stringify(newSale, null, 2));
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

      // Update sale details
      const updatedSale = await prisma.sale.update({
        where: { id },
        data: {
          ...saleDetails,
          start_date: new Date(saleDetails.start_date),
          end_date: new Date(saleDetails.end_date),
          is_active: saleDetails.is_active ?? true,
          thumbnail: saleDetails.thumbnail || null,
        },
      });

      // If products are provided, update the sale-product mappings
      if (products && Array.isArray(products)) {
        for (const product of products) {
          await prisma.saleProductMapping.upsert({
            where: { sale_id_product_id: { sale_id: id, product_id: product.product_id } },
            update: {
              discount_percent: new Prisma.Decimal(product.discount_percent || 0),
              discount_amount: new Prisma.Decimal(product.discount_amount || 0),
            },
            create: {
              sale_id: id,
              product_id: product.product_id,
              discount_percent: new Prisma.Decimal(product.discount_percent || 0),
              discount_amount: new Prisma.Decimal(product.discount_amount || 0),
            },
          });
        }
      }

      return updatedSale;
    } catch (error) {
      console.error("Error in salesService.updateSale:", error);
      throw new Error("Failed to update sale");
    }
  }

  // Delete a sale by ID
  async deleteSale(id) {
    try {
      // First, delete related sale-product mappings
      await prisma.saleProductMapping.deleteMany({
        where: { sale_id: id },
      });

      // Then, delete the sale itself
      await prisma.sale.delete({
        where: { id },
      });

      return { message: "Sale deleted successfully" };
    } catch (error) {
      console.error("Error in salesService.deleteSale:", error);
      throw new Error("Failed to delete sale");
    }
  }
}

export default new SalesService();
