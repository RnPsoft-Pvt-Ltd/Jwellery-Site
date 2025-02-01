import collectionService from "../services/collectionService.js";

class CollectionController {
  
  async getAllCollections(req, res, next) {
    try {
      const collections = await collectionService.getAllCollections();
      res.json(collections);
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req, res, next) {
    try {
      const collection = await collectionService.getCollectionById(req.params.id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      next(error);
    }
  }

  async createCollection(req, res, next) {
    try {
      const collection = await collectionService.createCollection(req.body);
      res.status(201).json(collection);
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req, res, next) {
    try {
      const collection = await collectionService.updateCollection(req.params.id, req.body);
      res.json(collection);
    } catch (error) {
      next(error);
    }
  }

  async deleteCollection(req, res, next) {
    try {
      await collectionService.deleteCollection(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new CollectionController();