import authservice from '../services/authService.js';
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

      const user = await authservice.registerUser(req.body);
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
      const result = await authservice.loginUser(req.body);
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
}

export default new AuthController();