import pool from '../config/database';

export interface ProductDB {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  tag?: string;
  sizes?: string[];
  colors?: string[];
  category: string;
  status: 'active' | 'draft' | 'archived';
  slug: string;
  created_at: string;
  updated_at: string;
}

export const ProductModel = {
  async getAll() {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  },

  async getById(id: number) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async create(product: Omit<ProductDB, 'id' | 'created_at' | 'updated_at'>) {
    const query = `
      INSERT INTO products (
        name, price, image, description, tag, 
        sizes, colors, category, status, slug
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      product.name,
      product.price,
      product.image,
      product.description,
      product.tag,
      product.sizes,
      product.colors,
      product.category,
      product.status,
      product.slug
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(id: number, product: Partial<ProductDB>) {
    const query = `
      UPDATE products
      SET 
        name = COALESCE($1, name),
        price = COALESCE($2, price),
        image = COALESCE($3, image),
        description = COALESCE($4, description),
        tag = COALESCE($5, tag),
        sizes = COALESCE($6, sizes),
        colors = COALESCE($7, colors),
        category = COALESCE($8, category),
        status = COALESCE($9, status),
        slug = COALESCE($10, slug),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;
    const values = [
      product.name,
      product.price,
      product.image,
      product.description,
      product.tag,
      product.sizes,
      product.colors,
      product.category,
      product.status,
      product.slug,
      id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id: number) {
    const query = 'DELETE FROM products WHERE id = $1';
    await pool.query(query, [id]);
  }
}; 