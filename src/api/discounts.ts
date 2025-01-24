import express, { Request, Response, Router } from 'express';
import { DiscountModel } from '../models/Discount';
import type { DiscountCode } from '../types';

interface VerifyDiscountRequest {
  code: string;
}

const router: Router = express.Router();

router.get('/discounts', async (_req: Request, res: Response) => {
  try {
    const discounts = await DiscountModel.getAll();
    res.json(discounts);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
});

router.post('/discounts/verify', 
  async (
    req: Request<{}, {}, VerifyDiscountRequest>, 
    res: Response
  ) => {
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
  }
);

router.post('/discounts', async (req: Request<{}, {}, DiscountCode>, res: Response) => {
  try {
    const newDiscount = await DiscountModel.create(req.body);
    res.status(201).json(newDiscount);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create discount' });
  }
});

export default router; 