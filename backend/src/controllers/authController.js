import authService from '../services/authService.js';
import { validateEmail, validatePassword } from '../utils/validation.js';

class AuthController {
  async register(req, res) {
    try {

    const { email, password } = req.body;

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        message: "Invalid email format" 
      });
    }

    // Validate password requirements
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" 
      });
    }

      const user = await authService.registerUser(req.body);
      res.status(201).json({ 
        message: "User registered successfully", 
        user 
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(error.message.includes("Invalid role") || 
                error.message.includes("already in use") ? 400 : 500)
         .json({ message: error.message || "Internal server error" });
    }
  }

  async login(req, res) {
    try {
      const result = await authService.loginUser(req.body);
      res.status(200).json({
        message: 'Login successful',
        ...result
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      const statusCode = 
        error.message === 'User not found' ? 404 :
        error.message === 'Invalid password' ? 401 :
        error.message === 'Email and password are required' ? 400 : 500;
      
      res.status(statusCode).json({ 
        message: error.message || "Internal server error" 
      });
    }
  }


  async getUserProfile(req, res) {
    try {
      // The user ID is extracted from req.user (set by authentication middleware)
      const userId = req.user.id;

      // Fetch user details from the database
      const user = await authService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  async updateUserProfile(req, res) {
    try {
      const userId = req.user.id; // Extract user ID from token
      const updatedData = req.body;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: "No fields provided for update" });
      }

      const updatedUser = await authService.updateUser(userId, updatedData);

      res.status(200).json({
        message: "User profile updated successfully",
        user: updatedUser
      });

    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }







}









export default new AuthController();