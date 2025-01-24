import express, { Request, Response } from 'express';
import { CollectionModel } from '../models/Collection';
import type { Collection } from '../types';

const router = express.Router();

interface CollectionParams {
  id: string;
}

interface AddProductRequest {
  productId: number;
}

router.get('/collections', async (_req: Request, res: Response) => {
  try {
    const collections = await CollectionModel.getAll();
    res.json(collections);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

router.get('/collections/:id', async (req: Request<CollectionParams>, res: Response) => {
  try {
    const collection = await CollectionModel.getById(Number(req.params.id));
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

router.post('/collections', async (req: Request<{}, {}, Collection>, res: Response) => {
  try {
    const newCollection = await CollectionModel.create(req.body);
    res.status(201).json(newCollection);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

router.post('/collections/:id/products', async (req: Request<CollectionParams, {}, AddProductRequest>, res: Response) => {
  try {
    const { productId } = req.body;
    await CollectionModel.addProduct(Number(req.params.id), productId);
    res.status(200).json({ message: 'Product added to collection' });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to add product to collection' });
  }
});

export default router; 