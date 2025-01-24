import { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 1,
    name: 'Summer 2024',
    description: 'Hot new styles for the summer season',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    featured: true,
    products: [1, 2],
    slug: 'summer-2024',
    status: 'active',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Essentials',
    description: 'Must-have pieces for your wardrobe',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    featured: false,
    products: [3, 4],
    slug: 'essentials',
    status: 'active',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  }
];