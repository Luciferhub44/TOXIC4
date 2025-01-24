import { X, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps): JSX.Element | null => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50">
      <div className="max-w-3xl mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {query.length >= 2 && (
          <div className="mt-4">
            {results.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No products found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(product => (
                  <div
                    key={product.id}
                    className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="flex items-center p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-[#FFD513]">{product.price}</p>
                        {product.tag && (
                          <span className="inline-block mt-1 px-2 py-1 bg-[#FFD513] text-black text-xs font-bold rounded">
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-gray-400 text-sm">
          <p className="mb-2">Quick Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Search by product name</li>
            <li>Search by category (e.g., "hoodies", "tees")</li>
            <li>Press ESC to close</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;