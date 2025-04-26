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
      const { id } = req.params;
      const {
        name, description, base_price, sale_price, SKU,
        stock_quantity, weight, width, height, length,
        images, variants, collection, category, tax_category
      } = req.body;

      if (!Array.isArray(variants)) {
        return res.status(400).json({ message: 'Variants must be an array.' });
      }

      const sanitizedVariants = variants.map((variant) => {
        if (
          !variant.color ||
          !variant.size ||
          variant.price_modifier == null ||
          !variant.inventory ||
          variant.inventory.quantity == null ||
          variant.inventory.low_stock_threshold == null
        ) {
          throw new Error('Each variant must have color, size, price_modifier, and inventory details.');
        }

        return {
          color: variant.color,
          size: variant.size,
          price_modifier: parseFloat(variant.price_modifier),
          inventory: {
            quantity: parseInt(variant.inventory.quantity, 10),
            low_stock_threshold: parseInt(variant.inventory.low_stock_threshold, 10),
          },
        };
      });

      const updateData = {
        name, description, base_price, sale_price, SKU,
        stock_quantity, weight, width, height, length,
        images, variants: sanitizedVariants,
        collection, category, tax_category,
      };

      const updatedProduct = await ProductService.updateProduct(id, updateData);
      res.json(updatedProduct);

    } catch (error) {
      console.error('Error updating product:', error.message);
      if (error.message.includes("Each variant")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
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
