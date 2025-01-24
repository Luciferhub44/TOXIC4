// src/api/collections.ts
import express from 'express';
import { CollectionModel } from '../models/Collection';
import { GetCollectionsHandler, GetCollectionHandler, CreateCollectionHandler, AddProductToCollectionHandler } from '../types';

const router = express.Router();

const getAllCollections: GetCollectionsHandler = async (_req, res) => {
  try {
    const collections = await CollectionModel.getAll();
    res.json({ data: collections });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
};

const getCollectionById: GetCollectionHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid collection ID' });
    }
    const collection = await CollectionModel.getById(id);
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json({ data: collection });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
};

const createCollection: CreateCollectionHandler = async (req, res) => {
  try {
    const newCollection = await CollectionModel.create(req.body);
    res.status(201).json({ data: newCollection });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create collection' });
  }
};

const addProductToCollection: AddProductToCollectionHandler = async (req, res) => {
  try {
    const { productId } = req.body;
    await CollectionModel.addProduct(Number(req.params.id), productId);
    res.status(200).json({ data: null });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to collection' });
  }
};

router.get('/collections', getAllCollections);
router.get('/collections/:id', getCollectionById);
router.post('/collections', createCollection);
router.post('/collections/:id/products', addProductToCollection);

export default router; 