import prisma from "../config/db.js";

class ProductService {
  async getAllProducts(filters = {}) {
    const {
      categoryId,
      collectionId,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 10,
    } = filters;
  
    // Ensure page and limit are valid numbers
    const validPage = Math.max(1, Number(page));
    const validLimit = Math.max(1, Math.min(100, Number(limit))); // Max 100
  
    const where = {
      AND: [],
    };
  
    // Apply filters
    if (categoryId) {
      where.AND.push({ category_id: categoryId });
    }
  
    if (collectionId) {
      where.AND.push({ collection_id: collectionId });
    }
  
    if (minPrice || maxPrice) {
      const priceFilter = { base_price: {} };
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
  
    if (where.AND.length === 0) {
      delete where.AND;
    }
  
    // Step 1: Fetch product IDs with pagination
    const baseProducts = await prisma.product.findMany({
      where,
      select: { id: true },
      skip: (validPage - 1) * validLimit,
      take: validLimit,
      orderBy: { SKU: "asc" },
    });
  
    const productIds = baseProducts.map((p) => p.id);
  
    if (productIds.length === 0) {
      return {
        data: [],
        pagination: {
          total: 0,
          totalPages: 0,
          currentPage: validPage,
          perPage: validLimit,
        },
      };
    }
  
    // Step 2: Fetch full product details for selected IDs
    const detailedProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: {
        category: true,
        images: {
          where: { is_primary: true },
        },
        tax_category: true,
        product_tax_mappings: {
          include: {
            tax_category: true,
          },
        },
        variants: {
          select: {
            id: true,
            size: true,
            color: true,
            price_modifier: true,
            inventory: {
              select: {
                total_quantity: true,
                reserved_quantity: true,
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
  
    // Step 3: Get total count for pagination
    const total = await prisma.product.count({ where });
  
    return {
      data: detailedProducts,
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
        // attributes: true,
        product_metadata: true,
         // Fetch the default tax category info
         tax_category: true,

         // Fetch any special tax mappings
         product_tax_mappings: {
           include: {
             tax_category: true,
           },
         },
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

  async updateProductVariants(variantId, variantData) {
    const { inventory, ...variantFields } = variantData;
  
    return prisma.$transaction(async (tx) => {
      // Update the variant itself
      const updatedVariant = await tx.productVariant.update({
        where: { id: variantId },
        data: variantFields,
      });
  
      // Update or create inventory for the variant
      if (inventory) {
        await tx.inventory.upsert({
          where: { product_variant_id: variantId },
          update: inventory,
          create: {
            ...inventory,
            product_variant_id: variantId,
          },
        });
      }
  
      // Return the updated variant with inventory
      return tx.productVariant.findUnique({
        where: { id: variantId },
        include: {
          inventory: true,
        },
      });
    });
  }
  

  async createProduct(productData) {
    // const { variants, images, attributes, metadata, ...productDetails } =
    const { variants, images, metadata, ...productDetails } =

      productData;

    // Start a transaction to ensure all related data is created consistently
    return prisma.$transaction(async (prismaTransaction) => {
      // Create the base product first
      const product = await prismaTransaction.product.create({
        data: productDetails,
      });

      // Add variants with inventory if they exist
      if (variants) {
        for (const variant of variants) {
          const { inventory, ...variantDetails } = variant;

          // Create variant with its inventory
          await prismaTransaction.productVariant.create({
            data: {
              ...variantDetails,
              product_id: product.id,
              inventory: inventory
                ? {
                    create: {
                      total_quantity: inventory.total_quantity || 0,
                      reserved_quantity: inventory.reserved_quantity || 0,
                      minimum_stock_alert: inventory.minimum_stock_alert || 5,
                    },
                  }
                : undefined,
            },
          });
        }
      }

      // Add images if they exist
      if (images) {
        await prismaTransaction.productImage.createMany({
          data: images.map((image) => ({
            ...image,
            product_id: product.id,
          })),
        });
      }

      // Add metadata if it exists
      if (metadata) {
        await prismaTransaction.productMetadata.create({
          data: {
            ...metadata,
            product_id: product.id,
          },
        });
      }

      // Return the complete product with all relations including inventory
      return prismaTransaction.product.findUnique({
        where: { id: product.id },
        include: {
          variants: {
            include: {
              inventory: true
            }
          },
          images: true,
          product_metadata: true,
          // attributes: true
        }
      });
    }, {
      timeout: 10000 // Increase timeout to 10 seconds
    });
  }

  async updateProduct(id, updateData) {
    try {
      console.log("i have been hit")
      return await prisma.$transaction(async (tx) => {
        const existingProduct = await tx.product.findUnique({ where: { id } });
        if (!existingProduct) {
          throw new Error('Product not found');
        }

        const updatedProduct = await tx.product.update({
          where: { id },
          data: {
            name: updateData.name,
            description: updateData.description,
            base_price: updateData.base_price,
            sale_price: updateData.sale_price,
            SKU: updateData.SKU,
            stock_quantity: updateData.stock_quantity,
            weight: updateData.weight,
            width: updateData.width,
            height: updateData.height,
            length: updateData.length,
            images: updateData.images,
            category: { connect: { id: updateData.category } },
            collection: { connect: { id: updateData.collection } },
            tax_category: { connect: { id: updateData.tax_category } },
          },
        });

        await tx.productVariant.deleteMany({ where: { product_id: id } });
console.log(updateData)
console.log(updateData.variants)
        const variants = await Promise.all(updateData.variants.map((variant) =>
          tx.productVariant.create({
            data: {
              color: variant.color,
              size: variant.size,
    weight: 0, // Ensure it's cast correctly
              price_modifier: variant.price_modifier,
              inventory: {
                create: {
                  total_quantity: variant.inventory.quantity,
                  minimum_stock_alert: variant.inventory.low_stock_threshold,
                  reserved_quantity:1
                  
                },
              },
              product: { connect: { id: updatedProduct.id } },
            },

          })
        ));

        return { ...updatedProduct, variants };
      }, {
    timeout: 10000, // 10 seconds
    maxWait: 10000  // optional: wait longer for connection
  });
    } catch (error) {
      
      console.log('Error in ProductService.updateProduct:', error.message);
      throw new Error(`Failed to update product: ${error.message}`);
    }
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
      // await prisma.productAttribute.deleteMany({ where: { product_id: id } });
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
