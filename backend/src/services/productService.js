import prisma from "../config/db.js";

class ProductService {
  async getAllProducts(filters = {}) {
    const {
      categoryId,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 10,
    } = filters;

    // Ensure page and limit are valid numbers
    const validPage = Math.max(1, Number(page));
    const validLimit = Math.max(1, Math.min(100, Number(limit))); // Add maximum limit of 100

    const where = {
      AND: [],
    };

    // Only add conditions if they exist
    if (categoryId) {
      where.AND.push({ category_id: categoryId });
    }

    if (minPrice || maxPrice) {
      const priceFilter = {
        base_price: {},
      };
      if (minPrice) priceFilter.base_price.gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.base_price.lte = parseFloat(maxPrice);
      where.AND.push(priceFilter);
    }

    if (search) {
      where.AND.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    // If no filters are applied, remove the AND array
    if (where.AND.length === 0) {
      delete where.AND;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          where: { is_primary: true },
        },
        variants: {
          select: {
            id: true,
            size: true,
            color: true,
            price_modifier: true,
          },
        },
      },
      skip: (validPage - 1) * validLimit,
      take: validLimit,
      orderBy: {
        name: "asc", // Changed from created_at to name
      },
    });

    const total = await prisma.product.count({ where });

    return {
      data: products,
      pagination: {
        total,
        totalPages: Math.ceil(total / validLimit),
        currentPage: validPage,
        perPage: validLimit,
      },
    };
  }

  async getProductById(id) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        collection: true,
        images: true,
        variants: true,
        attributes: true,
        product_metadata: true,
      },
    });
  }

  async getProductVariants(productId) {
    return prisma.productVariant.findMany({
      where: { product_id: productId },
      include: {
        inventory: true,
      },
    });
  }

  async createProduct(productData) {
    const { variants, images, attributes, metadata, ...productDetails } = productData;
  
    // Create the base product first
    const product = await prisma.product.create({
      data: productDetails,
    });
  
    // Add variants if they exist
    if (variants) {
      await prisma.productVariant.createMany({
        data: variants.map(variant => ({
          ...variant,
          product_id: product.id
        }))
      });
    }
  
    // Add images if they exist
    if (images) {
      await prisma.productImage.createMany({
        data: images.map(image => ({
          ...image,
          product_id: product.id
        }))
      });
    }
  
    // Add metadata if it exists
    if (metadata) {
      await prisma.productMetadata.create({
        data: {
          ...metadata,
          product_id: product.id
        }
      });
    }
  
    // Return the complete product with all relations
    return prisma.product.findUnique({
      where: { id: product.id },
      include: {
        variants: true,
        images: true,
        product_metadata: true,
        attributes: true
      }
    });
  }

  async updateProduct(id, updateData) {
    const { variants, images, attributes, metadata, ...productDetails } =
      updateData;

    return prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          ...productDetails,
          variants: variants
            ? {
                upsert: variants.map((variant) => ({
                  where: { id: variant.id || "new" },
                  create: variant,
                  update: variant,
                })),
              }
            : undefined,
          images: images
            ? {
                upsert: images.map((image) => ({
                  where: { id: image.id || "new" },
                  create: image,
                  update: image,
                })),
              }
            : undefined,
          attributes: attributes
            ? {
                upsert: attributes.map((attr) => ({
                  where: { id: attr.id || "new" },
                  create: attr,
                  update: attr,
                })),
              }
            : undefined,
          product_metadata: metadata
            ? {
                update: metadata,
              }
            : undefined,
        },
        include: {
          variants: true,
          images: true,
          attributes: true,
          product_metadata: true,
        },
      });

      return product;
    });
  }

  async deleteProduct(id) {
    try {
      // Fetch related ProductVariant IDs
      const variants = await prisma.productVariant.findMany({
        where: { product_id: id },
        select: { id: true },
      });
      const variantIds = variants.map((variant) => variant.id);

      // Delete OrderItems referencing ProductVariants
      await prisma.orderItem.deleteMany({
        where: { product_variant_id: { in: variantIds } },
      });

      // Delete related records
      await prisma.productMetadata.deleteMany({ where: { product_id: id } });
      await prisma.productVariant.deleteMany({ where: { product_id: id } });
      await prisma.productImage.deleteMany({ where: { product_id: id } });
      await prisma.productAttribute.deleteMany({ where: { product_id: id } });
      await prisma.wishlist.deleteMany({ where: { product_id: id } });
      await prisma.productReview.deleteMany({ where: { product_id: id } });
      await prisma.productTaxMapping.deleteMany({ where: { product_id: id } });
      await prisma.saleProductMapping.deleteMany({ where: { product_id: id } });

      // Delete the product itself
      await prisma.product.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}

export default new ProductService();
