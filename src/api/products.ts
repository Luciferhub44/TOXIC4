import express, { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import type { Product } from '../types';

const router = express.Router();

interface ProductParams {
  id: string;
}

// Get all products
router.get('/products', async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.getAll();
    res.json(products);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/products/:id', async (req: Request<ProductParams>, res: Response) => {
  try {
    const product = await ProductModel.getById(Number(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body as Product);
    res.status(201).json(newProduct);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.update(Number(req.params.id), req.body as Partial<Product>);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const success = await ProductModel.delete(Number(req.params.id));
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router; 