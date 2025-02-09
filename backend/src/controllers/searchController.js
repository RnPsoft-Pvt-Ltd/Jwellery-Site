// src/controllers/searchController.js
import searchService from "../services/searchService.js";
import { errorHandler } from "../utils/errorHandler.js";

class SearchController {
  async searchProducts(req, res) {
    try {
      const searchParams = {
        query: req.query.q,
        category: req.query.category,
        collection: req.query.collection,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        page: req.query.page,
        limit: req.query.limit,
      };

      const result = await searchService.searchProducts(searchParams);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async searchCustomers(req, res) {
    try {
      const searchParams = {
        query: req.query.q,
        page: req.query.page,
        limit: req.query.limit,
      };

      const result = await searchService.searchCustomers(searchParams);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async searchOrders(req, res) {
    try {
      const searchParams = {
        query: req.query.q,
        status: req.query.status,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        page: req.query.page,
        limit: req.query.limit,
      };

      const result = await searchService.searchOrders(searchParams);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async searchCategories(req, res) {
    try {
      const searchParams = {
        query: req.query.q,
        page: req.query.page,
        limit: req.query.limit,
      };

      const result = await searchService.searchCategories(searchParams);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async searchCoupons(req, res) {
    try {
      const searchParams = {
        query: req.query.q,
        isActive: req.query.isActive === "true",
        page: req.query.page,
        limit: req.query.limit,
      };

      const result = await searchService.searchCoupons(searchParams);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export default new SearchController();
