import express from 'express';
import { ProductModel } from '../models/Product';

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router; 