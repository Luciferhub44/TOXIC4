// src/api/discounts.ts
import express from 'express';
import { DiscountModel } from '../models/Discount';
import { GetDiscountsHandler, CreateDiscountHandler, VerifyDiscountHandler } from '../types';

const router = express.Router();

const getAllDiscounts: GetDiscountsHandler = async (_req, res) => {
  try {
    const discounts = await DiscountModel.getAll();
    res.json({ data: discounts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
};

const createDiscount: CreateDiscountHandler = async (req, res) => {
  try {
    const newDiscount = await DiscountModel.create(req.body);
    res.status(201).json({ data: newDiscount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create discount' });
  }
};

const verifyDiscount: VerifyDiscountHandler = async (req, res) => {
  try {
    const { code } = req.body;
    const discount = await DiscountModel.getByCode(code);
    if (!discount) {
      return res.status(404).json({ error: 'Invalid discount code' });
    }
    res.json({ data: discount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify discount' });
  }
};

router.get('/discounts', getAllDiscounts);
router.post('/discounts', createDiscount);
router.post('/discounts/verify', verifyDiscount);

export default router; 