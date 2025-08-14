import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft,
  CreditCard,
  Shield,
  Truck,
  Gift,
  Tag,
  Heart,
  Star
} from 'lucide-react';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shipping = 0; // Free shipping
  const tax = getTotalPrice() * 0.08; // 8% tax
  const discount = appliedPromo ? getTotalPrice() * 0.1 : 0; // 10% discount if promo applied
  const finalTotal = getTotalPrice() + shipping + tax - discount;

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === 'elegance10') {
      setAppliedPromo(promoCode);
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code. Try "ELEGANCE10" for 10% off!');
    }
    setPromoCode('');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const relatedProducts = [
    {
      id: 'related-1',
      name: 'Elegant Candle Set',
      price: 49,
      image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8
    },
    {
      id: 'related-2',
      name: 'Decorative Bowl',
      price: 79,
      image: 'https://images.pexels.com/photos/1358912/pexels-photo-1358912.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6
    }
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Link
              to="/store"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              <ShoppingBag size={20} className="mr-2" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/store"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-medium text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-slate-500">
                              ${item.price} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center gap-1">
                      <Tag size={16} />
                      Discount ({appliedPromo.toUpperCase()})
                    </span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white text-sm"
                  />
                  <button
                    onClick={handlePromoApply}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors text-sm"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-emerald-600 text-sm mt-2">
                    ✓ {appliedPromo.toUpperCase()} applied successfully!
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 mb-4"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Secure Checkout
                  </>
                )}
              </button>

              {/* Security Features */}
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-600" />
                  <span>Secure payment with SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-emerald-600" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-emerald-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                You Might Also Like
              </h3>
              <div className="space-y-4">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-600">
                          ${product.price}
                        </span>
                        <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;