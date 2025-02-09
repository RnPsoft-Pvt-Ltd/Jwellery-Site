import express from 'express';
import categoryController from '../controllers/categoryController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


// router.get('/', categoryController.getAllCategories);
// router.get('/:id', categoryController.getCategoryById);
// router.post('/', authenticate, isAdmin, categoryController.createCategory);
// router.put('/:id', authenticate, isAdmin, categoryController.updateCategory);
// router.delete('/:id', authenticate, isAdmin, categoryController.deleteCategory);


export default router;