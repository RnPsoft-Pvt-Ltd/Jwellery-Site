import authservice from '../services/authService.js';

class AuthController {
  async register(req, res) {
    try {
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