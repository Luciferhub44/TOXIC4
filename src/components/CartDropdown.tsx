import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
  const { items, total, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-gray-900 rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="w-5 h-5 text-[#FFD513]" />
            <span className="ml-2 text-white font-medium">Shopping Cart</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            Your cart is empty
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-400">
                    {item.size && `Size: ${item.size}`}
                    {item.color && ` / Color: ${item.color}`}
                  </p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#FFD513]">{item.product.price}</p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex justify-between text-white mb-4">
            <span>Total</span>
            <span className="font-bold text-[#FFD513]">{total}</span>
          </div>
          <button
            onClick={() => {
              navigate('/checkout');
              onClose();
            }}
            className="w-full bg-[#FFD513] text-black py-2 rounded-md font-bold hover:bg-[#FAFF34] transition-colors"
          >
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;