// src/services/AuthService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from "@prisma/client";
import prisma from '../config/db.js';

class AuthService {
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
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}

export default new AuthService();