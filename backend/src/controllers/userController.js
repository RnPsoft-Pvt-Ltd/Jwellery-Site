import userService from "../services/userService.js";

class userController {
  async getUserProfile(req, res) {
    try {
      // The user ID is extracted from req.user (set by authentication middleware)
      const userId = req.user.id;

      // Fetch user details from the database
      const user = await userService.getUserById(userId);

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
        return res
          .status(400)
          .json({ message: "No fields provided for update" });
      }

      const updatedUser = await userService.updateUser(userId, updatedData);

      res.status(200).json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUsersWithOrders(req, res) {
    try {
      const users = await userService.getUsersWithOrders(); // Call the service function
      return res.status(200).json(users); // Ensure the response is sent
    } catch (error) {
      console.error("Error fetching users with orders:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    try {
      // console.log("hi")
      const userId = req.params.id;

      const user = await userService.getUserById(userId);
      // console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Fetch all users with filters
  async getAllUsers(req, res) {
    try {
      console.log("hi");
      const { email, name } = req.query; // Use query parameters for filtering
      const filters = { email, name };

      const users = await userService.getAllUsers(filters);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }
}

export default new userController();
