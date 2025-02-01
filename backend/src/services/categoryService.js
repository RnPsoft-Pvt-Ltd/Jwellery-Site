import prisma from "../config/db.js";

class CategoryService {
  async getAllCategories(filters = {}) {
    const { page = 1, limit = 10 } = filters;

    const validPage = Math.max(1, Number(page));
    const validLimit = Math.max(1, Math.min(100, Number(limit)));

    const categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            images: true,
            product_metadata: true
          }
        }
      },
      skip: (validPage - 1) * validLimit,
      take: validLimit,
      orderBy: {
        name: "asc"
      }
    });

    const total = await prisma.category.count();

    return {
      data: categories,
      pagination: {
        total,
        totalPages: Math.ceil(total / validLimit),
        currentPage: validPage,
        perPage: validLimit,
      },
    };
  }

  async getCategoryById(id) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            images: true,
            product_metadata: true
          }
        }
      }
    });
  }

  async createCategory(categoryData) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        description: categoryData.description,
      }
    });

    return category;
  }

  async updateCategory(id, updateData) {
    return prisma.category.update({
      where: { id },
      data: {
        name: updateData.name,
        description: updateData.description,
      }
    });
  }

  async deleteCategory(id) {
    try {
      // Start a transaction to ensure data consistency
      return await prisma.$transaction(async (prisma) => {
        // Get all products in this category
        const products = await prisma.product.findMany({
          where: { category_id: id },
          select: { id: true }
        });

        // Delete related records for all products in this category
        if (products.length > 0) {
          const productIds = products.map(p => p.id);
          
          // Delete product related records
          await prisma.productImage.deleteMany({
            where: { product_id: { in: productIds } }
          });
          
          await prisma.productMetadata.deleteMany({
            where: { product_id: { in: productIds } }
          });
          
          await prisma.productTaxMapping.deleteMany({
            where: { product_id: { in: productIds } }
          });
          
          await prisma.saleProductMapping.deleteMany({
            where: { product_id: { in: productIds } }
          });

          // Delete products
          await prisma.product.deleteMany({
            where: { category_id: id }
          });
        }

        // Finally delete the category
        await prisma.category.delete({
          where: { id }
        });

        return { success: true };
      });
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}

export default new CategoryService();