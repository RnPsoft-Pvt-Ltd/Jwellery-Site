import express from 'express';
import shipmentController from '../controllers/shipmentController.js'
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',authenticate, isAdmin, shipmentController.getShipments);
router.put('/:id',authenticate, isAdmin, shipmentController.updateShipment);

// router.get('/', getShipments);
// router.put('/:id', updateShipment);

export default router;