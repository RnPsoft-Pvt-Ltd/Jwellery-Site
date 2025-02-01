// import express from 'express';
// import authController from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', authController.register.bind(authController));
// router.post('/login', authController.login.bind(authController));
// router.get('/me', authMiddleware, authController.getLoggedInUser);

// export default router;

import express from 'express';
import authController from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/profile', authenticate, authController.getUserProfile);
router.put('/updateprofile', authenticate, authController.updateUserProfile.bind(authController));

export default router;