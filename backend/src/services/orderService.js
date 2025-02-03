import prisma from '../config/db.js';

class OrderService {
  // Place a new order
  async placeOrder(orderData, userId) {
    try {
      const { shipping_address_id, billing_address_id, order_items, ...rest } = orderData;
  
      // Generate a unique order number (e.g., using a simple format or a UUID)
      const orderNumber = `ORD-${Date.now()}`; // You can replace this with any logic you prefer
  
      const order = await prisma.order.create({
        data: {
          ...rest,
          user_id: userId,
          shipping_address_id,
          billing_address_id,
          order_items: {
            create: order_items,
          },
          order_number: orderNumber, // Include the generated order number here
        },
        include: {
          order_items: true,
        },
      });
  
      return order;
    } catch (error) {
      console.error("Error in orderService.placeOrder:", error.message);
      throw new Error("Failed to place order");
    }
  }
  

  // Get orders for the logged-in user
  async getUserOrders(userId) {
    try {
      const orders = await prisma.order.findMany({
        where: { user_id: userId },
        include: {
          order_items: true,
          shipping_address: true,
          billing_address: true,
        },
      });
      return orders;
    } catch (error) {
      console.error("Error in orderService.getUserOrders:", error.message);
      throw new Error("Failed to fetch user orders");
    }
  }

  // Get details of a specific order
  async getOrderById(orderId, userId) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId, user_id: userId },
        include: {
          order_items: true,
          shipping_address: true,
          billing_address: true,
        },
      });

      if (!order) throw new Error("Order not found");
      return order;
    } catch (error) {
      console.error("Error in orderService.getOrderById:", error.message);
      throw new Error("Failed to fetch order details");
    }
  }

  // Cancel an order
  async cancelOrder(orderId, userId) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId, user_id: userId },
        data: { status: 'CANCELLED' },
      });
      return order;
    } catch (error) {
      console.error("Error in orderService.cancelOrder:", error.message);
      throw new Error("Failed to cancel order");
    }
  }

  // Get all orders (Admin only)
  async getAllOrders() {
    try {
      const orders = await prisma.order.findMany({
        include: {
          order_items: true,
          shipping_address: true,
          billing_address: true,
        },
      });
      return orders;
    } catch (error) {
      console.error("Error in orderService.getAllOrders:", error.message);
      throw new Error("Failed to fetch all orders");
    }
  }

  // Update order status (Admin only)
  async updateOrderStatus(orderId, status) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
      return order;
    } catch (error) {
      console.error("Error in orderService.updateOrderStatus:", error.message);
      throw new Error("Failed to update order status");
    }
  }
}

export default new OrderService();