import express from 'express';
import couponController from '../controllers/couponController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/',authenticate, couponController.getAllCoupons);

router.post('/',authenticate, isAdmin, couponController.createCoupon);
router.put('/:id',authenticate, isAdmin, couponController.updateCoupon);
router.delete('/:id',authenticate, isAdmin, couponController.deleteCoupon);

export default router;