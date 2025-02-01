import productService from "../services/productService.js";
import { errorHandler } from "../utils/errorHandler.js";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const filters = {
        categoryId: req.query.categoryId,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        search: req.query.search,
        page: req.query.page ? parseInt(req.query.page) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit) : undefined,
      };

      // Remove undefined values
      Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key]
      );

      const result = await productService.getAllProducts(filters);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async getProductVariants(req, res) {
    try {
      const variants = await productService.getProductVariants(req.params.id);
      res.json(variants);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      errorHandler(error, req, res);
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export default new ProductController();
