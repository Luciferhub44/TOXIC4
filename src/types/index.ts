export interface Product {
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
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  products: number[];
  slug: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type CollectionFormData = Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>;

export type Bundle = {
  id: number;
  name: string;
  products: Product[];
  price: string;
  savings: string;
  image: string;
  description?: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  slug: string;
  validFrom?: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BundleFormData {
  name: string;
  price: string;
  savings: string;
  image: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  slug: string;
  validFrom: string;
  validUntil: string;
  productIds: number[];
}

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

export interface ProductFormData extends Omit<Product, 'id'> {
  id?: number;
}

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}