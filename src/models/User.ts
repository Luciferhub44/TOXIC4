import pool from '../config/database';
import type { User } from '../types';
import bcrypt from 'bcrypt';

export class UserModel {
  static async create(user: Omit<User, 'id'>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `
      INSERT INTO users (
        email, password, first_name, last_name,
        address, city, country, postal_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      user.email,
      hashedPassword,
      user.first_name,
      user.last_name,
      user.address,
      user.city,
      user.country,
      user.postal_code
    ];
    const { rows: [newUser] } = await pool.query(query, values);
    delete newUser.password;
    return newUser;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows: [user] } = await pool.query(query, [email]);
    return user || null;
  }
} 