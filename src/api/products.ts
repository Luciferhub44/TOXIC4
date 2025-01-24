// src/api/products.ts
import express from 'express';
import { ProductModel } from '../models/Product';
import { GetProductsHandler, GetProductHandler, CreateProductHandler, UpdateProductHandler, DeleteProductHandler } from '../types';

const router = express.Router();

const getAllProducts: GetProductsHandler = async (_req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById: GetProductHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = await ProductModel.getById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const createProduct: CreateProductHandler = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ data: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const updateProduct: UpdateProductHandler = async (req, res) => {
  try {
    const product = await ProductModel.update(Number(req.params.id), req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct: DeleteProductHandler = async (req, res) => {
  try {
    const success = await ProductModel.delete(Number(req.params.id));
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;