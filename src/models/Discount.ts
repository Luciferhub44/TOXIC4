import pool from '../config/database';
import type { DiscountCode } from '../types';

export class DiscountModel {
  static async getAll(): Promise<DiscountCode[]> {
    const query = 'SELECT * FROM discounts WHERE end_date > NOW() ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getByCode(code: string): Promise<DiscountCode | null> {
    const query = `
      SELECT * FROM discounts 
      WHERE code = $1 
      AND start_date <= NOW() 
      AND end_date > NOW() 
      AND usage_count < max_usage
    `;
    const { rows } = await pool.query(query, [code]);
    return rows[0] || null;
  }

  static async create(discount: Omit<DiscountCode, 'id'>): Promise<DiscountCode> {
    const query = `
      INSERT INTO discounts (
        code, type, value, min_purchase_amount,
        start_date, end_date, max_usage, usage_count,
        product_ids, collection_ids
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      discount.code,
      discount.type,
      discount.value,
      discount.min_purchase_amount,
      discount.start_date,
      discount.end_date,
      discount.max_usage,
      0,
      JSON.stringify(discount.product_ids),
      JSON.stringify(discount.collection_ids)
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async incrementUsage(code: string): Promise<boolean> {
    const query = `
      UPDATE discounts 
      SET usage_count = usage_count + 1 
      WHERE code = $1 
      AND usage_count < max_usage 
      RETURNING *
    `;
    const { rowCount } = await pool.query(query, [code]);
    return rowCount > 0;
  }
} 