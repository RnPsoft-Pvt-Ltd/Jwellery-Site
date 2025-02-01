import express from 'express';
import addressController from '../controllers/addressController.js';
import { authenticate, isAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", authenticate, addressController.createAddress);
router.get("/", authenticate, addressController.getAllAddresses);
router.get("/:id", authenticate, addressController.getAddressById);
router.put("/:id", authenticate, addressController.updateAddress);
router.delete("/:id", authenticate, addressController.deleteAddress);

export default router;