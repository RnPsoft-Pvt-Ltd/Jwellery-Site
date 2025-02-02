// src/services/userService.js

import prisma from '../config/db.js';


class userService {

  async getUserById(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        user_preferences: true,
        login_histories: true,
        wishlists: true,
        product_reviews: true,
        carts: true,
        orders: true,
      },
    });
  }



  async updateUser(userId, updatedData) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true } // Fetch user addresses for validation
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updateFields = {};

    if (updatedData.name) updateFields.name = updatedData.name;
    if (updatedData.phone) updateFields.phone = updatedData.phone;
    if (updatedData.date_of_birth) updateFields.date_of_birth = new Date(updatedData.date_of_birth);

    // **Handle Address Updates**
    let addressUpdates = [];
    if (updatedData.address) {
      const userAddress = existingUser.addresses[0]; // Assuming a user has 1 primary address

      if (userAddress) {
        // Update the existing address
        addressUpdates.push(
          prisma.address.update({
            where: { id: userAddress.id },
            data: updatedData.address
          })
        );
      } else {
        // Create a new address
        addressUpdates.push(
          prisma.address.create({
            data: { ...updatedData.address, user_id: userId }
          })
        );
      }
    }

    // **Ensure at least one field is updated**
    if (Object.keys(updateFields).length === 0 && addressUpdates.length === 0) {
      return existingUser;
    }

    // Perform updates in a transaction
    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: updateFields,
        include: { addresses: true }
      }),
      ...addressUpdates
    ]);

    return updatedUser;
  }


 

  async getUsersWithOrders() {
    try{
      const users = await prisma.user.findMany({
        where: {
          orders: {
            some: {} // Ensures only users with at least one order are fetched
          }
        },
        include: {
          orders: {
            include: {
              order_items: true, // Fetch order items related to each order
              shipping_address: true, // Include shipping address
              billing_address: true, // Include billing address
              payment_transactions: true // Include payment transactions
            }
          }
        }
      });
    
      console.log("Users with orders:", users); // Debugging output
      return users;
    }catch(error){
      res.status(500).json({ message: "Internal server error" });
    }
    }


    async getUserById(id) {
        try {
          const user = await prisma.user.findUnique({
            where: { id }
          });
          return user;
        } catch (error) {
          throw new Error('Error fetching user by ID');
        }
      }
    
      // Fetch all users with optional filters
      async getAllUsers(filters) {
        try {
          return await prisma.user.findMany({
            where: {
              email: filters.email ? { contains: filters.email } : undefined,
              name: filters.name ? { contains: filters.name } : undefined,
            },
            include: { orders: true },  // Optional: include orders with the user
          });
        } catch (error) {
          throw new Error('Error fetching users');
        }
      }
      


}

export default new userService();