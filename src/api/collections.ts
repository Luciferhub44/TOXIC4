import express from 'express';
import { CollectionModel } from '../models/Collection';
import type { Collection } from '../types';

const router = express.Router();

interface AddProductRequest {
  productId: number;
}

router.get('/collections', async (_req, res) => {
  try {
    const collections = await CollectionModel.getAll();
    res.json(collections);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

router.get('/collections/:id', async (req, res) => {
  try {
    const collection = await CollectionModel.getById(Number(req.params.id));
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

router.post('/collections', async (req, res) => {
  try {
    const newCollection = await CollectionModel.create(req.body as Collection);
    res.status(201).json(newCollection);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

router.post('/collections/:id/products', async (req, res) => {
  try {
    const { productId } = req.body as AddProductRequest;
    await CollectionModel.addProduct(Number(req.params.id), productId);
    res.status(200).json({ message: 'Product added to collection' });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to add product to collection' });
  }
});

export default router; 