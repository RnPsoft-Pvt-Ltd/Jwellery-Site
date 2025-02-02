// import express from 'express';
// import authController from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', authController.register.bind(authController));
// router.post('/login', authController.login.bind(authController));
// router.get('/me', authMiddleware, authController.getLoggedInUser);

// export default router;

import express from 'express';

import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/me', authenticate, userController.getUserProfile);
router.put('/me', authenticate, userController.updateUserProfile.bind(userController));



// Route to fetch all users with optional filters (Only accessible by Admin)
router.get('/filteruser',authenticate, isAdmin, userController.getAllUsers);
// Route to fetch a user by ID (Only accessible by Admin)
router.get('/:id',authenticate, isAdmin, userController.getUserById);



router.get('/users-with-orders', authenticate, isAdmin, userController.getUsersWithOrders);


export default router;