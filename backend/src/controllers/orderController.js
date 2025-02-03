import orderService from '../services/orderService.js';

class OrderController {
  // Place a new order
  async placeOrder(req, res) {
    try {
      const order = await orderService.placeOrder(req.body, req.user.id);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get orders for the logged-in user
  async getUserOrders(req, res) {
    try {
      const orders = await orderService.getUserOrders(req.user.id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get details of a specific order
  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user.id);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Cancel an order
  async cancelOrder(req, res) {
    try {
      const order = await orderService.cancelOrder(req.params.id, req.user.id);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all orders (Admin only)
  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update order status (Admin only)
  async updateOrderStatus(req, res) {
    try {
      const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new OrderController();