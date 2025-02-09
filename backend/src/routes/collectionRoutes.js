import express from 'express';
import collectionController from '../controllers/collectionController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', collectionController.getAllCollections );
router.get('/:id', collectionController.getCollectionById);
router.post('/', collectionController.createCollection);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

// router.post('/', authenticate, isAdmin, collectionController.createCollection);
// router.put('/:id', authenticate, isAdmin, collectionController.updateCollection);
// router.delete('/:id', authenticate, isAdmin, collectionController.deleteCollection);

export default router;