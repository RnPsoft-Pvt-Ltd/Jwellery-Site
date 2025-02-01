import prisma from "../config/db.js";

class CategoryService {
  
  async getAllCategories(filters = {}) {
    const { parentCategoryId, page = 1, limit = 10 } = filters;

    const validPage = Math.max(1, Number(page));
    const validLimit = Math.max(1, Math.min(100, Number(limit)));

    const where = {};

    if (parentCategoryId) {
      where.parent_category_id = parentCategoryId;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        products: true, // Include associated products
        subcategories: true, // Include subcategories
      },
      skip: (validPage - 1) * validLimit,
      take: validLimit,
      orderBy: {
        name: "asc", // Ordering categories by name
      },
    });

    const total = await prisma.category.count({ where });

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
        products: true,
        subcategories: true,
        parent_category: true, // Include parent category
      },
    });
  }

  async createCategory(categoryData) {
    const { parentCategoryId, ...categoryDetails } = categoryData;

    const category = await prisma.category.create({
      data: {
        ...categoryDetails,
        parent_category: parentCategoryId
          ? { connect: { id: parentCategoryId } }
          : undefined,
      },
    });

    return category;
  }

  async updateCategory(id, updateData) {
    const { parentCategoryId, ...categoryDetails } = updateData;

    return prisma.category.update({
      where: { id },
      data: {
        ...categoryDetails,
        parent_category: parentCategoryId
          ? { connect: { id: parentCategoryId } }
          : undefined,
      },
    });
  }

  async deleteCategory(id) {
    try {
      // Delete associated products and subcategories
      await prisma.product.deleteMany({ where: { category_id: id } });
      await prisma.category.deleteMany({ where: { parent_category_id: id } });

      // Delete the category itself
      await prisma.category.delete({ where: { id } });

      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}

export default new CategoryService();