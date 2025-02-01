// src/services/AuthService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from "@prisma/client";
import prisma from '../config/db.js';

class authService {
  async registerUser(userData) {
    const { name, email, password, phone, role } = userData;

    if (!Object.values(UserRole).includes(role)) {
      throw new Error("Invalid role. Must be CUSTOMER or ADMIN.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        phone,
        role,
      },
    });

    return newUser;
  }

  async loginUser(credentials) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }


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




}

export default new authService();