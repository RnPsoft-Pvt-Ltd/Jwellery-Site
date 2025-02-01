// src/services/cartService.js
import prisma from "../config/db.js";
import { AppError } from "../utils/errorHandler.js";

class CartService {
  async addToCart(userId, productVariantId, quantity) {
    // Validate product variant exists and has sufficient stock
    const productVariant = await prisma.productVariant.findUnique({
      where: { id: productVariantId },
      include: {
        inventory: true,
        product: true,
      },
    });

    if (!productVariant) {
      throw new AppError("Product variant not found", 404);
    }

    if (productVariant.inventory.total_quantity < quantity) {
      throw new AppError("Insufficient stock", 400);
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_variant_id: productVariantId,
      },
    });

    if (existingCartItem) {
      // Update quantity if item exists
      return this.updateCartItem(userId, existingCartItem.id, quantity);
    }

    // Update inventory - reduce available quantity and increase reserved quantity
    await prisma.inventory.update({
      where: { product_variant_id: productVariantId },
      data: {
        total_quantity: productVariant.inventory.total_quantity - quantity,
        reserved_quantity: {
          increment: quantity,
        },
      },
    });

    // Create new cart item
    const cartItem = await prisma.cart.create({
      data: {
        user_id: userId,
        product_variant_id: productVariantId,
        quantity,
      },
      include: {
        product_variant: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    return cartItem;
  }

  async getCart(userId) {
    const cartItems = await prisma.cart.findMany({
      where: {
        user_id: userId,
      },
      include: {
        product_variant: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    // Calculate total with correct price calculation
    const total = cartItems.reduce((sum, item) => {
      const basePrice = item.product_variant.product.base_price;
      const priceModifier = item.product_variant.price_modifier;
      const finalPrice = Number(basePrice) + Number(priceModifier);
      return sum + finalPrice * item.quantity;
    }, 0);

    // Add calculated prices to each item for frontend display
    const itemsWithPrices = cartItems.map((item) => {
      const basePrice = item.product_variant.product.base_price;
      const priceModifier = item.product_variant.price_modifier;
      const finalPrice = Number(basePrice) + Number(priceModifier);
      return {
        ...item,
        unit_price: finalPrice,
        subtotal: finalPrice * item.quantity,
      };
    });

    return {
      items: itemsWithPrices,
      total,
    };
  }

  async updateCartItem(userId, cartId, quantity) {
    // Get current cart item to calculate inventory difference
    const currentCartItem = await prisma.cart.findFirst({
      where: {
        id: cartId,
        user_id: userId,
      },
      include: {
        product_variant: {
          include: {
            inventory: true,
            product: true,
          },
        },
      },
    });

    if (!currentCartItem) {
      throw new AppError("Cart item not found", 404);
    }

    const quantityDifference = quantity - currentCartItem.quantity;

    // Check if new quantity is possible with current stock
    if (
      currentCartItem.product_variant.inventory.total_quantity <
      quantityDifference
    ) {
      throw new AppError("Insufficient stock", 400);
    }

    // Update inventory
    await prisma.inventory.update({
      where: { product_variant_id: currentCartItem.product_variant_id },
      data: {
        total_quantity: {
          decrement: quantityDifference,
        },
        reserved_quantity: {
          increment: quantityDifference,
        },
      },
    });

    // Update quantity
    const updatedCart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        quantity,
      },
      include: {
        product_variant: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    return updatedCart;
  }

  async removeFromCart(userId, cartId) {
    // Validate cart item exists and belongs to user
    const cartItem = await prisma.cart.findFirst({
      where: {
        id: cartId,
        user_id: userId,
      },
      include: {
        product_variant: true,
      },
    });

    if (!cartItem) {
      throw new AppError("Cart item not found", 404);
    }

    // Restore inventory quantities
    await prisma.inventory.update({
      where: { product_variant_id: cartItem.product_variant_id },
      data: {
        total_quantity: {
          increment: cartItem.quantity,
        },
        reserved_quantity: {
          decrement: cartItem.quantity,
        },
      },
    });

    // Remove cart item
    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }
}

export default new CartService();
