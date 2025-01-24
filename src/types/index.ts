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
  status: 'active' | 'draft' | 'archived';
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

// Form Data Types
export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type CollectionFormData = Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>;

export interface BundleFormData {
  name: string;
  price: string;
  savings: string;
  image: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  slug: string;
  valid_from?: string;
  valid_until?: string;
  product_ids: number[];
}

// Other Types
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
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

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}