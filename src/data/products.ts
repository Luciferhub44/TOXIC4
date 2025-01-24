import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'TOXIC HAZARD HOODIE V2',
    price: '$129.99',
    tag: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'The evolution of our iconic hoodie. Features oversized fit, premium cotton blend, and reflective toxic prints.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#FFD513', '#FFFFFF'],
    category: 'hoodies',
    status: 'active',
    slug: 'toxic-hazard-hoodie-v2',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'RADIOACTIVE TEE',
    price: '$49.99',
    tag: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Classic fit tee with radioactive print. Made from 100% organic cotton.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#FFD513', '#FFFFFF'],
    category: 'tees',
    status: 'active',
    slug: 'radioactive-tee',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'BIOHAZARD CARGO PANTS',
    price: '$149.99',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Technical cargo pants with multiple pockets and biohazard details.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#333333'],
    category: 'pants',
    status: 'active',
    slug: 'biohazard-cargo-pants',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'FALLOUT JACKET',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Weather-resistant jacket with reflective details and hidden pockets.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#FFD513'],
    category: 'jackets',
    status: 'active',
    slug: 'fallout-jacket',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  }
];