import pool from '../config/database';

export interface ProductDB {
  id: number;
  name: string;
  price: string;
  image: string;
  // ... other fields
}

export const ProductModel = {
  async getAll() {
    const query = 'SELECT * FROM products';
    const { rows } = await pool.query(query);
    return rows;
  },

  async create(product: Omit<ProductDB, 'id'>) {
    const query = `
      INSERT INTO products (name, price, image, description, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [product.name, product.price, product.image, product.description, product.status];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(id: number, product: Partial<ProductDB>) {
    const query = `
      UPDATE products
      SET name = $1, price = $2, image = $3, description = $4, status = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [product.name, product.price, product.image, product.description, product.status, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id: number) {
    const query = 'DELETE FROM products WHERE id = $1';
    await pool.query(query, [id]);
  }
}; 