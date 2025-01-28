import couponService from '../services/couponService.js';

class CouponController {
  async getAllCoupons(req, res) {
    try {
      const coupons = await couponService.getAllCoupons();
      res.json({
        status: 'success',
        data: coupons
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error fetching coupons'
      });
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
      res.status(400).json({
        status: 'error',
        message: 'Error creating coupon'
      });
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
      res.status(400).json({
        status: 'error',
        message: 'Error updating coupon'
      });
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
      res.status(400).json({
        status: 'error',
        message: 'Error deleting coupon'
      });
    }
  }
}

export default new CouponController();