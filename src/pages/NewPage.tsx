import { AlertCircle, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NewPage = () => {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch('/api/products/new');
        if (!response.ok) throw new Error('Failed to fetch new products');
        const data = await response.json();
        setNewProducts(data);
      } catch (error) {
        console.error('Error loading new products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  if (isLoading) return <div className="bg-black min-h-screen">Loading...</div>;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="New collection background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-16 h-16 text-[#FFD513] mx-auto mb-8 animate-pulse" />
          <h1 className="text-5xl font-bold text-white mb-6">NEW ARRIVALS</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Fresh drops that push the boundaries of streetwear. Limited quantities available.
          </p>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <Clock className="w-8 h-8 text-[#FFD513] mx-auto mb-2" />
              <p className="text-white font-medium">Just Dropped</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-[#FFD513] mx-auto mb-2" />
              <p className="text-white font-medium">Limited Edition</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {newProducts.map(product => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative aspect-w-16 aspect-h-9 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#FFD513] mb-2">{product.name}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
                <span className="text-xl font-bold text-white">{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8">
            Don't miss out on our latest drops. Join our newsletter to stay updated.
          </p>
          <div className="flex justify-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-64 px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
            />
            <button className="bg-[#FFD513] text-black px-6 py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors">
              NOTIFY ME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;