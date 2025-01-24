import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDropdown from './CartDropdown';
import SearchModal from './SearchModal';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <nav className="bg-black border-b border-[#FFD513]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-12 w-45" src="/src/toxic_4.png" alt="TOXIC" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/new" className="text-[#FFD513] hover:text-[#FAFF34] px-3 py-2 rounded-md text-sm font-medium">NEW</Link>
                <Link to="/bundles" className="text-gray-300 hover:text-[#FFD513] px-3 py-2 rounded-md text-sm font-medium">BUNDLES</Link>
                <Link to="/collections" className="text-gray-300 hover:text-[#FFD513] px-3 py-2 rounded-md text-sm font-medium">COLLECTIONS</Link>
                <Link to="/about" className="text-gray-300 hover:text-[#FFD513] px-3 py-2 rounded-md text-sm font-medium">ABOUT</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-[#FFD513]"
              >
                <Search className="h-5 w-5" />
              </button>
              <div className="relative">
                <button
                  className="text-gray-300 hover:text-[#FFD513] relative"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FFD513] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
                <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#FFD513]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <Link to="/new" className="text-[#FFD513] block px-3 py-2 rounded-md text-base font-medium">NEW</Link>
            <Link to="/bundles" className="text-gray-300 hover:text-[#FFD513] block px-3 py-2 rounded-md text-base font-medium">BUNDLES</Link>
            <Link to="/collections" className="text-gray-300 hover:text-[#FFD513] block px-3 py-2 rounded-md text-base font-medium">COLLECTIONS</Link>
            <Link to="/about" className="text-gray-300 hover:text-[#FFD513] block px-3 py-2 rounded-md text-base font-medium">ABOUT</Link>
            <div className="border-t border-gray-800 mt-4 pt-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-[#FFD513]"
              >
                <Search className="w-5 h-5 mr-2" />
                <span>Search</span>
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-[#FFD513]"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>Cart {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;