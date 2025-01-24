import { RequestHandler } from 'express';

// Database Types
export interface DBProduct {
  id: number;
  name: string;
  price: string;
  tag?: string;
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  category: string;
  status: string;
  slug: string;
  created_at: string;
  updated_at: string;
  product_id: number;
}

export interface DBCollection {
  id: number;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  products: number[];
  slug: string;
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface DBBundle {
  id: number;
  name: string;
  price: string;
  savings: string;
  image: string;
  description?: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  slug: string;
  valid_from?: string;
  valid_until?: string;
  created_at: string;
  updated_at: string;
}

// Frontend Types
export interface Product extends Omit<DBProduct, 'created_at' | 'updated_at'> {
  createdAt: string;
  updatedAt: string;
}

export interface Collection extends Omit<DBCollection, 'created_at' | 'updated_at'> {
  createdAt: string;
  updatedAt: string;
}

export interface Bundle extends Omit<DBBundle, 'created_at' | 'updated_at'> {
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

// Form Types
export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type CollectionFormData = Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>;
export type BundleFormData = Omit<Bundle, 'id' | 'createdAt' | 'updatedAt' | 'products'> & {
  product_ids: number[];
};

// Cart & Checkout Types
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  discountCode?: string;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  discountCode?: string;
}

// Discount Types
export interface DiscountCode {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_purchase_amount?: number;
  start_date: string;
  end_date: string;
  max_usage?: number;
  usage_count: number;
  product_ids?: number[];
  collection_ids?: number[];
  created_at: string;
  updated_at: string;
}

// Admin Types
export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  contactEmail: string;
}

// Order Types
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  size?: string;
  color?: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_id?: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: string;
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  payment_intent_id: string;
  email: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderFormData {
  email: string;
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  items: {
    product_id: number;
    quantity: number;
    price: string;
    size?: string;
    color?: string;
  }[];
  total: string;
  payment_intent_id: string;
}

// User Types
export interface User {
  id: number;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface UserFormData extends Omit<User, 'id' | 'created_at' | 'updated_at' | 'role'> {
  password: string;
  confirm_password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
}

// API Request/Response Types
export interface ApiResponse<T = void> {
  data?: T;
  error?: string;
}

// Base API Types with proper response format
export type ApiHandler<P = {}, ResBody = unknown, ReqBody = unknown> = 
  RequestHandler<P, ApiResponse<ResBody>, ReqBody>;

// Product Handlers
export interface ProductParams { id: string; }
export type GetProductHandler = ApiHandler<ProductParams, Product>;
export type UpdateProductHandler = ApiHandler<ProductParams, Product, Partial<ProductFormData>>;
export type DeleteProductHandler = ApiHandler<ProductParams>;

// Collection Handlers
export interface CollectionParams { id: string; }
export type GetCollectionHandler = ApiHandler<CollectionParams, Collection>;

// Discount Handlers
export interface VerifyDiscountBody { code: string; }
export type VerifyDiscountHandler = ApiHandler<Record<string, unknown>, DiscountCode, VerifyDiscountBody>;

// Product API Types
export type GetProductsHandler = ApiHandler<Record<string, unknown>, Product[]>;
export type CreateProductHandler = ApiHandler<Record<string, unknown>, Product, ProductFormData>;

// Collection API Types
export interface AddProductRequest { productId: number; }
export type GetCollectionsHandler = ApiHandler<Record<string, unknown>, Collection[]>;
export type CreateCollectionHandler = ApiHandler<Record<string, unknown>, Collection, CollectionFormData>;
export type AddProductToCollectionHandler = ApiHandler<CollectionParams, void, AddProductRequest>;

// Discount API Types
export type GetDiscountsHandler = ApiHandler<Record<string, unknown>, DiscountCode[]>;
export type CreateDiscountHandler = ApiHandler<Record<string, unknown>, DiscountCode, Omit<DiscountCode, 'id' | 'created_at' | 'updated_at'>>;
