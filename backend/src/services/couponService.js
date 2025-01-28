import prisma from '../config/db.js';

class CouponService {
  async getAllCoupons() {
    const currentDate = new Date();
    return await prisma.coupon.findMany({
      where: {
        end_date: {
          gte: currentDate
        }
      }
    });
  }

  async createCoupon(couponData) {
    return await prisma.coupon.create({
      data: {
        code: couponData.code,
        description: couponData.description,
        start_date: new Date(couponData.start_date),
        end_date: new Date(couponData.end_date),
        free_shipping: couponData.free_shipping,
        max_discount: couponData.max_discount,
        usage_limit: couponData.usage_limit,
        discount_type: couponData.discount_type
      }
    });
  }

  async updateCoupon(id, couponData) {
    return await prisma.coupon.update({
      where: { id },
      data: {
        code: couponData.code,
        description: couponData.description,
        start_date: new Date(couponData.start_date),
        end_date: new Date(couponData.end_date),
        free_shipping: couponData.free_shipping,
        max_discount: couponData.max_discount,
        usage_limit: couponData.usage_limit,
        discount_type: couponData.discount_type
      }
    });
  }

  async deleteCoupon(id) {
    return await prisma.coupon.delete({
      where: { id }
    });
  }
}

export default new CouponService();