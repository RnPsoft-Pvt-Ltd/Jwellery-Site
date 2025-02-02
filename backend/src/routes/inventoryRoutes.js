import express from "express";
import inventoryController from "../controllers/inventoryController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
// import inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

// router.get("/", inventoryController.getInventory.bind(inventoryController));
router.put("/:id",isAdmin, inventoryController.updateInventory.bind(inventoryController));

// Define the GET /inventory route
router.get("/",isAdmin, inventoryController.getInventory);

export default router;
