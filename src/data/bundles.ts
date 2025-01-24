import { Bundle } from '../types';
import { products } from './products';

export const bundles: Bundle[] = [
  {
    id: 1,
    name: 'TOXIC ESSENTIALS PACK',
    products: [products[0], products[1]],
    price: '$159.99',
    savings: '$19.99',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Get started with our essential streetwear pieces.',
    status: 'active',
    featured: true,
    slug: 'toxic-essentials-pack',
    validFrom: '2024-03-01',
    validUntil: '2024-12-31',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'FULL HAZARD FIT',
    products: [products[0], products[1], products[2]],
    price: '$299.99',
    savings: '$29.98',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Complete your look with our signature hazard collection.',
    status: 'active',
    featured: false,
    slug: 'full-hazard-fit',
    validFrom: '2024-03-01',
    validUntil: '2024-12-31',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  }
];