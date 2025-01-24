import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CheckoutForm, DiscountCode } from '../types';
import { CreditCard, Gift, Lock, ShieldCheck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
  });

  const handleApplyDiscount = () => {
    // Simulate discount code validation
    if (discountCode.toUpperCase() === 'TOXIC20') {
      setAppliedDiscount({
        code: 'TOXIC20',
        type: 'percentage',
        value: 20
      });
    } else {
      alert('Invalid discount code');
    }
  };

  const calculateDiscount = () => {
    if (!appliedDiscount) return 0;
    const subtotal = parseFloat(total.replace('$', ''));
    return appliedDiscount.type === 'percentage'
      ? (subtotal * appliedDiscount.value) / 100
      : appliedDiscount.value;
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(total.replace('$', ''));
    const discount = calculateDiscount();
    return (subtotal - discount).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Here you would typically:
      // 1. Send order details to your backend
      // 2. Create a payment intent
      // 3. Confirm the payment with Stripe
      
      // Simulated success
      setTimeout(() => {
        clearCart();
        navigate('/success');
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">CHECKOUT</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                  required
                />
              </div>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`p-4 rounded-lg border-2 flex items-center justify-center ${
                      paymentMethod === 'card'
                        ? 'border-[#FFD513] bg-[#FFD513]/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-lg border-2 flex items-center justify-center ${
                      paymentMethod === 'paypal'
                        ? 'border-[#FFD513] bg-[#FFD513]/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <img src="/paypal-logo.svg" alt="PayPal" className="h-5 mr-2" />
                    <span>PayPal</span>
                  </button>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-[#FFD513] text-black py-4 rounded-md font-bold hover:bg-[#FAFF34] transition-colors flex items-center justify-center ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    PROCESSING...
                  </>
                ) : (
                  'COMPLETE ORDER'
                )}
              </button>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
                <ShieldCheck className="w-4 h-4 mr-2" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 p-8 rounded-lg h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.product.name}</h3>
                    <p className="text-gray-400">
                      {item.size && `Size: ${item.size}`}
                      {item.color && ` / Color: ${item.color}`}
                    </p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#FFD513] font-medium">{item.product.price}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <div className="flex justify-between text-white mb-2">
                <span>Subtotal</span>
                <span>${parseFloat(total.replace('$', '')).toFixed(2)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-[#FFD513] mb-2">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span>-${calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white mb-2">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#FFD513] mt-4">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>

              {/* Discount Code Input */}
              <div className="mt-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD513]"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;