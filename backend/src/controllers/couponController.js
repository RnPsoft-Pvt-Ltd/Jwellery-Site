import couponService from '../services/couponService.js';
import { errorHandler } from '../utils/errorHandler.js';

class CouponController {
  async getAllCoupons(req, res) {
    try {
      const coupons = await couponService.getAllCoupons();
      res.json({
        status: 'success',
        data: coupons
      });
    } catch (error) {
      errorHandler(error,req, res);
    }
  }

  async createCoupon(req, res) {
    try {
      const coupon = await couponService.createCoupon(req.body);
      res.status(201).json({
        status: 'success',
        data: coupon
      });
    } catch (error) {
      errorHandler(error,req, res);
    }
  }

 async updateCoupon(req, res) {
    try {
      const coupon = await couponService.updateCoupon(req.params.id, req.body);
      res.json({
        status: 'success',
        data: coupon
      });
    } catch (error) {
      errorHandler(error,req, res);
    }
  }

  async deleteCoupon(req, res) {
    try {
      await couponService.deleteCoupon(req.params.id);
      res.json({
        status: 'success',
        message: 'Coupon deleted successfully'
      });
    } catch (error) {
      errorHandler(error,req, res);
    }
  }
}

export default new CouponController();