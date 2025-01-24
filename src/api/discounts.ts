import express, { RequestHandler } from 'express';
import { DiscountModel } from '../models/Discount';
import type { DiscountCode } from '../types';

const router = express.Router();

interface VerifyDiscountBody {
  code: string;
}

const getAllDiscounts: RequestHandler = async (_req, res) => {
  try {
    const discounts = await DiscountModel.getAll();
    res.json(discounts);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
};

const verifyDiscount: RequestHandler<{}, {}, VerifyDiscountBody> = async (req, res) => {
  try {
    const { code } = req.body;
    const discount = await DiscountModel.getByCode(code);
    if (!discount) {
      return res.status(404).json({ error: 'Invalid discount code' });
    }
    return res.json(discount);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify discount' });
  }
};

const createDiscount: RequestHandler<{}, {}, DiscountCode> = async (req, res) => {
  try {
    const newDiscount = await DiscountModel.create(req.body);
    res.status(201).json(newDiscount);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create discount' });
  }
};

router.get('/discounts', getAllDiscounts);
router.post('/discounts/verify', verifyDiscount);
router.post('/discounts', createDiscount);

export default router; 