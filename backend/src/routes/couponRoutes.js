import express from 'express';
import couponController from '../controllers/couponController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', couponController.getAllCoupons);

// router.post('/', isAdmin, couponController.createCoupon);
// router.put('/:id', isAdmin, couponController.updateCoupon);
// router.delete('/:id', isAdmin, couponController.deleteCoupon);


router.post('/',  couponController.createCoupon);
router.put('/:id',  couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);

export default router;