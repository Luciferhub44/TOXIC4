import { ShoppingBag } from 'lucide-react';
import { bundles } from '../data/bundles';
import { useCart } from '../context/CartContext';

const BundlesPage = () => {
  const { addToCart } = useCart();

  const handleAddBundle = (bundle) => {
    // Add each product in the bundle to the cart
    bundle.products.forEach(product => {
      addToCart(product, 1);
    });
  };

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">TOXIC BUNDLES</h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Get more for less with our curated bundles. Each bundle is carefully selected to create
          the perfect toxic streetwear look.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundles.map(bundle => (
            <div key={bundle.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{bundle.name}</h2>
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-bold text-[#FFD513]">{bundle.price}</span>
                  <span className="text-sm text-[#FFD513]">Save {bundle.savings}</span>
                </div>
                <div className="space-y-4 mb-6">
                  {bundle.products.map(product => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-gray-400">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleAddBundle(bundle)}
                  className="w-full bg-[#FFD513] text-black py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>ADD BUNDLE TO CART</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundlesPage;