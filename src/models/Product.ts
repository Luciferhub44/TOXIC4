import pool from '../config/database';
import type { Product } from '../types';

export class ProductModel {
  static async getAll(): Promise<Product[]> {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id: number): Promise<Product | null> {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  static async create(product: Omit<Product, 'id'>): Promise<Product> {
    const query = `
      INSERT INTO products (
        name, price, description, image, tag, sizes, colors,
        materials, care_instructions, category, status, stock,
        sku, slug, product_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
    const values = [
      product.name,
      product.price,
      product.description,
      product.image,
      product.tag,
      JSON.stringify(product.sizes),
      JSON.stringify(product.colors),
      product.category,
      product.status,
      product.slug,
      product.product_id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async update(id: number, product: Partial<Product>): Promise<boolean> {
    const updates = Object.entries(product)
      .map(([key, value], index) => {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        return `${snakeKey} = $${index + 2}`;
      })
      .join(', ');

    const query = `UPDATE products SET ${updates} WHERE id = $1 RETURNING *`;
    const values = [id, ...Object.values(product)];
    const { rowCount } = await pool.query(query, values);
    return rowCount > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM products WHERE id = $1';
    const { rowCount } = await pool.query(query, [id]);
    return rowCount > 0;
  }
} 