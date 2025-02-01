import express from 'express';
import taxJurisdictionController from '../controllers/taxJurisdictionController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',authenticate, isAdmin, taxJurisdictionController.getTaxJurisdictions);
router.post('/',authenticate, isAdmin, taxJurisdictionController.addTaxJurisdiction);

export default router;