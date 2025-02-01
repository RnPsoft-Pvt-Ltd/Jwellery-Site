// src/controllers/cartController.js
import cartService from "../services/cartService.js";
import { errorHandler } from "../utils/errorHandler.js";

class CartController {
  async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const { productVariantId, quantity } = req.body;

      const cart = await cartService.addToCart(
        userId,
        productVariantId,
        quantity
      );

      res.status(201).json({
        status: "success",
        data: cart,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async getCart(req, res) {
    try {
      const userId = req.user.id;

      const cart = await cartService.getCart(userId);

      res.status(200).json({
        status: "success",
        data: cart,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async updateCartItem(req, res) {
    try {
      const userId = req.user.id;
      const cartId = req.params.id;
      const { quantity } = req.body;

      const updatedCart = await cartService.updateCartItem(
        userId,
        cartId,
        quantity
      );

      res.status(200).json({
        status: "success",
        data: updatedCart,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.user.id;
      const cartId = req.params.id;

      await cartService.removeFromCart(userId, cartId);

      res.status(204).send();
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export default new CartController();
