import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, ShoppingBag, Truck, Shield, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import SEO from '../components/SEO';
import ProductGallery from '../components/ProductGallery';
import ProductReviews from '../components/ProductReviews';
import SizeGuide from '../components/SizeGuide';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) return <div>Product not found</div>;

  const additionalImages = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="bg-black min-h-screen">
      <SEO
        title={`${product.name} | TOXIC Streetwear`}
        description={product.description}
        image={product.image}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <ProductGallery
            productId={product.id}
            mainImage={product.image}
            productName={product.name}
            additionalImages={additionalImages}
          />

          {/* Product Details */}
          <div className="flex flex-col">
            {product.tag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFD513] text-black mb-4 w-fit">
                {product.tag}
              </span>
            )}
            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-[#FFD513] mb-6">{product.price}</p>
            <p className="text-gray-400 mb-8">{product.description}</p>

            {/* Shipping Info */}
            <div className="bg-gray-900 p-4 rounded-lg mb-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-[#FFD513] mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-[#FFD513] mx-auto mb-2" />
                  <p className="text-sm text-gray-300">1 Year Warranty</p>
                </div>
                <div className="text-center">
                  <Package className="w-6 h-6 text-[#FFD513] mx-auto mb-2" />
                  <p className="text-sm text-gray-300">30-Day Returns</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">SIZE</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-400">Select your size</p>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm text-[#FFD513] hover:text-[#FAFF34] transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`py-2 rounded-md font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-[#FFD513] text-black'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div className="mb-8">
                <h3 className="text-white font-medium mb-3">COLOR</h3>
                <div className="flex space-x-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-[#FFD513]'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border-2 border-gray-800 rounded-md">
                <button
                  className="px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 text-white">{quantity}</span>
                <button
                  className="px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="flex-1 bg-[#FFD513] text-black py-3 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center justify-center space-x-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-800 pt-8 space-y-8">
              <section>
                <h3 className="text-white font-medium mb-4">Materials & Care</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-400">
                  <div>
                    <h4 className="font-medium text-white mb-2">Materials</h4>
                    <ul className="space-y-1">
                      <li>100% Premium Cotton</li>
                      <li>Heavy-weight fabric (320 gsm)</li>
                      <li>Ribbed cuffs and hem</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Care Instructions</h4>
                    <ul className="space-y-1">
                      <li>Machine wash cold</li>
                      <li>Tumble dry low</li>
                      <li>Do not bleach</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-white font-medium mb-4">Shipping & Returns</h3>
                <ul className="text-gray-400 space-y-2">
                  <li>Free worldwide shipping on orders over $150</li>
                  <li>30-day return policy</li>
                  <li>Estimated delivery: 3-5 business days</li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={Number(id)} />

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Size Guide</h3>
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <SizeGuide />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;