import prisma from "../config/db.js";

class CollectionService {

  async getAllCollections() {
    return prisma.collection.findMany({
      include: {
        products: true, // Include associated products in the response
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async getCollectionById(id) {
    return prisma.collection.findUnique({
      where: { id },
      include: {
        products: true, // Include associated products
      },
    });
  }

  async createCollection(collectionData) {
    return prisma.collection.create({
      data: collectionData,
    });
  }

  async updateCollection(id, updateData) {
    return prisma.collection.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteCollection(id) {
    return prisma.collection.delete({
      where: { id },
    });
  }
}

export default new CollectionService();