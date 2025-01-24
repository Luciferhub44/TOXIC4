import pool from '../config/database';
import type { Collection } from '../types';

export class CollectionModel {
  static async getAll(): Promise<Collection[]> {
    const query = 'SELECT * FROM collections ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id: number): Promise<Collection | null> {
    const query = `
      SELECT c.*, array_agg(p.*) as products 
      FROM collections c 
      LEFT JOIN collection_products cp ON c.id = cp.collection_id 
      LEFT JOIN products p ON cp.product_id = p.id 
      WHERE c.id = $1 
      GROUP BY c.id
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  static async create(collection: Omit<Collection, 'id'>): Promise<Collection> {
    const query = `
      INSERT INTO collections (
        name, description, image, slug, status, 
        featured, start_date, end_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      collection.name,
      collection.description,
      collection.image,
      collection.slug,
      collection.status,
      collection.featured
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async addProduct(collectionId: number, productId: number): Promise<void> {
    const query = `
      INSERT INTO collection_products (collection_id, product_id)
      VALUES ($1, $2)
    `;
    await pool.query(query, [collectionId, productId]);
  }
} 