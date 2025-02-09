// /src/utils/searchValidation.js
import  { z } from 'zod';

const searchValidation = {
  // Product search validation schema
  productSearchSchema: z.object({
    q: z.string().optional(),
    category: z.string().uuid().optional(),
    collection: z.string().uuid().optional(),
    minPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    maxPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    page: z.string().regex(/^\d+$/).default('1'),
    limit: z.string().regex(/^\d+$/).default('10'),
    sortBy: z.enum(['price_asc', 'price_desc', 'name_asc', 'name_desc']).optional(),
    inStock: z.enum(['true', 'false']).optional()
  }),

  // Customer search validation schema
  customerSearchSchema: z.object({
    q: z.string().optional(),
    page: z.string().regex(/^\d+$/).default('1'),
    limit: z.string().regex(/^\d+$/).default('10'),
    sortBy: z.enum(['name_asc', 'name_desc', 'date_asc', 'date_desc']).optional(),
    hasOrders: z.enum(['true', 'false']).optional()
  }),

  // Order search validation schema
  orderSearchSchema: z.object({
    q: z.string().optional(),
    status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().regex(/^\d+$/).default('1'),
    limit: z.string().regex(/^\d+$/).default('10'),
    minAmount: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    maxAmount: z.string().regex(/^\d+(\.\d{1,2})?$/).optional()
  }),

  validateProductSearch: (req, res, next) => {
    try {
      const validated = searchValidation.productSearchSchema.parse(req.query);
      req.validatedQuery = validated;
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid search parameters',
        details: error.errors
      });
    }
  },

  validateCustomerSearch: (req, res, next) => {
    try {
      const validated = searchValidation.customerSearchSchema.parse(req.query);
      req.validatedQuery = validated;
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid search parameters',
        details: error.errors
      });
    }
  },

  validateOrderSearch: (req, res, next) => {
    try {
      const validated = searchValidation.orderSearchSchema.parse(req.query);
      req.validatedQuery = validated;
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid search parameters',
        details: error.errors
      });
    }
  }
};

export default searchValidation;