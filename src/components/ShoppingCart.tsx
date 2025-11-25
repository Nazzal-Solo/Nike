import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const ShoppingCart: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-nike-gray-900 border-l border-nike-gray-700 z-50 flex flex-col"
            initial={{ x: 384 }}
            animate={{ x: 0 }}
            exit={{ x: 384 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="p-6 border-b border-nike-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-6 h-6 text-nike-orange" />
                  <h3 className="text-xl font-bold text-nike-white">
                    Shopping Cart ({state.itemCount})
                  </h3>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-nike-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-nike-gray-400" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-nike-gray-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-nike-gray-400 mb-2">
                    Your cart is empty
                  </h4>
                  <p className="text-nike-gray-500">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="bg-nike-gray-800 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex space-x-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-nike-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-nike-white text-sm mb-1">
                            {item.name}
                          </h4>
                          <p className="text-nike-gray-400 text-xs mb-2">
                            {item.category}
                          </p>
                          {item.size && (
                            <p className="text-nike-gray-400 text-xs mb-1">
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-nike-gray-400 text-xs mb-2">
                              Color: {item.color}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-nike-orange font-bold">
                              {formatPrice(item.price)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1 hover:bg-nike-gray-700 rounded transition-colors"
                              >
                                <Minus className="w-4 h-4 text-nike-gray-400" />
                              </button>
                              <span className="text-nike-white font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1 hover:bg-nike-gray-700 rounded transition-colors"
                              >
                                <Plus className="w-4 h-4 text-nike-gray-400" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-nike-gray-700 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-nike-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-nike-gray-700 p-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-nike-white">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-nike-orange">
                    {formatPrice(state.total)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={clearCart}
                    className="w-full py-3 bg-nike-gray-800 text-nike-white rounded-lg hover:bg-nike-gray-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button className="w-full py-3 bg-nike-orange text-nike-white rounded-lg hover:bg-nike-orange/90 transition-colors font-semibold">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
