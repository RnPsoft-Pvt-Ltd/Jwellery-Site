import prisma from "../config/db.js";

class CollectionService {
  async getAllCollections(filters = {}) {
    const { page = 1, limit = 10 } = filters;

    try {
      const validPage = Math.max(1, Number(page));
      const validLimit = Math.max(1, Math.min(100, Number(limit)));

      const collections = await prisma.collection.findMany({
        include: {
          products: {
            include: {
              images: true,
              variants: true,
              product_metadata: true
            }
          }
        },
        // skip: (validPage - 1) * validLimit,
        // take: validLimit,
        orderBy: {
          created_at: "desc"
        }
      });

      // const total = await prisma.collection.count();

      return {
        data: collections,
        // pagination: {
        //   total,
        //   totalPages: Math.ceil(total / validLimit),
        //   currentPage: validPage,
        //   perPage: validLimit
        // }
      };
    } catch (error) {
      throw new Error(`Failed to fetch collections: ${error.message}`);
    }
  }

  async getCollectionById(id) {
    try {
      const collection = await prisma.collection.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              images: true,
              variants: true,
              product_metadata: true
            }
          }
        }
      });

      if (!collection) {
        throw new Error('Collection not found');
      }

      return collection;
    } catch (error) {
      throw new Error(`Failed to fetch collection: ${error.message}`);
    }
  }

  async createCollection(collectionData) {
    try {
      const collection = await prisma.collection.create({
        data: {
          name: collectionData.name,
          description: collectionData.description,
          thumbnail: collectionData.thumbnail
        }
      });

      return collection;
    } catch (error) {
      throw new Error(`Failed to create collection: ${error.message}`);
    }
  }

  async updateCollection(id, updateData) {
    try {
      const collection = await prisma.collection.update({
        where: { id },
        data: {
          name: updateData.name,
          description: updateData.description,
          thumbnail: updateData.thumbnail
        }
      });

      return collection;
    } catch (error) {
      throw new Error(`Failed to update collection: ${error.message}`);
    }
  }

  async deleteCollection(id) {
    try {
      return await prisma.$transaction(async (prisma) => {
        // Get all products in this collection
        const products = await prisma.product.findMany({
          where: { collection_id: id },
          select: { id: true }
        });

        if (products.length > 0) {
          const productIds = products.map(p => p.id);

          // Delete product relationships in the correct order
          await prisma.productImage.deleteMany({
            where: { product_id: { in: productIds } }
          });

          await prisma.productMetadata.deleteMany({
            where: { product_id: { in: productIds } }
          });

          await prisma.productVariant.deleteMany({
            where: { product_id: { in: productIds } }
          });

          await prisma.productTaxMapping.deleteMany({
            where: { product_id: { in: productIds } }
          });

          await prisma.saleProductMapping.deleteMany({
            where: { product_id: { in: productIds } }
          });

          // Delete the products
          await prisma.product.deleteMany({
            where: { collection_id: id }
          });
        }

        // Finally delete the collection
        await prisma.collection.delete({
          where: { id }
        });

        return { success: true, message: 'Collection and related products deleted successfully' };
      });
    } catch (error) {
      throw new Error(`Failed to delete collection: ${error.message}`);
    }
  }
}

export default new CollectionService();