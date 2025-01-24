import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ImageWithFallback from './ImageWithFallback';
import { Product } from '@/types';

const products = [
  {
    id: 1,
    name: 'TOXIC HAZARD HOODIE V2',
    price: '$129.99',
    tag: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'RADIOACTIVE TEE',
    price: '$49.99',
    tag: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'BIOHAZARD CARGO PANTS',
    price: '$149.99',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'FALLOUT JACKET',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">FEATURED DROPS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-900">
                {product.tag && (
                  <div className="absolute top-2 left-2 bg-[#FFD513] text-black px-2 py-1 text-xs font-bold rounded">
                    {product.tag}
                  </div>
                )}
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product as Product, 1);
                      }}
                      className="w-full bg-[#FFD513] text-black py-2 rounded font-bold hover:bg-[#FAFF34] transition-colors"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-[#FFD513]">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-white">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="inline-flex items-center bg-transparent border-2 border-[#FFD513] text-[#FFD513] px-8 py-3 rounded-md font-bold hover:bg-[#FFD513] hover:text-black transition-colors">
            VIEW ALL PRODUCTS
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;