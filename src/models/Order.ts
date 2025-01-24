import pool from '../config/database';
import type { Order } from '../types';

export class OrderModel {
  static async create(order: Omit<Order, 'id'>): Promise<Order> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Create order
      const orderQuery = `
        INSERT INTO orders (
          user_id, status, total, shipping_address,
          payment_intent_id, email
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const orderValues = [
        order.user_id,
        order.status,
        order.total,
        order.shipping_address,
        order.payment_intent_id,
        order.email
      ];
      const { rows: [newOrder] } = await client.query(orderQuery, orderValues);

      // Create order items
      const itemsQuery = `
        INSERT INTO order_items (
          order_id, product_id, quantity, price,
          size, color
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `;
      for (const item of order.items) {
        await client.query(itemsQuery, [
          newOrder.id,
          item.product_id,
          item.quantity,
          item.price,
          item.size,
          item.color
        ]);
      }

      await client.query('COMMIT');
      return newOrder;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getById(id: number): Promise<Order | null> {
    const orderQuery = 'SELECT * FROM orders WHERE id = $1';
    const itemsQuery = 'SELECT * FROM order_items WHERE order_id = $1';
    
    const { rows: [order] } = await pool.query(orderQuery, [id]);
    if (!order) return null;

    const { rows: items } = await pool.query(itemsQuery, [id]);
    return { ...order, items };
  }
} 