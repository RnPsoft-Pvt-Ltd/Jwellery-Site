import express from 'express';
import orderController from '../controllers/orderController.js'
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js'; 

const router=express.Router();


router.post('/', authenticate, orderController.placeOrder);
router.get('/', authenticate, orderController.getUserOrders);
router.get('/:id',authenticate, orderController.getOrderById);
router.put('/:id/cancel', authenticate, orderController.cancelOrder);
router.get('/admin/all',authenticate, isAdmin, orderController.getAllOrders);
router.put('/admin/:id', authenticate, isAdmin, orderController.updateOrderStatus);
export default router;