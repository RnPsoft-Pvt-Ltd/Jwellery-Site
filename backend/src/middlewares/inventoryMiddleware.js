import { body, validationResult } from "express-validator";

class InventoryMiddleware {
  static async validateInventoryUpdate(req, res, next) {
    const rules = [
      body("total_quantity").optional().isInt({ min: 0 }).withMessage("Total quantity must be a positive integer"),
      body("reserved_quantity").optional().isInt({ min: 0 }).withMessage("Reserved quantity must be a positive integer"),
      body("minimum_stock_alert").optional().isInt({ min: 0 }).withMessage("Minimum stock alert must be a positive integer"),
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export default InventoryMiddleware;
