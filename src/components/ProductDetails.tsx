import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Star, Heart, Share2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew: boolean;
  colors: string[];
  sizes?: string[];
  description?: string;
  features?: string[];
  images?: string[];
}

interface ProductDetailsProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  if (!product) return null;

  const images = product.images || [product.image];
  const currentImage = images[currentImageIndex];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 bg-nike-gray-900 rounded-2xl z-50 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="h-full flex flex-col lg:flex-row">
              {/* Product Images */}
              <div className="lg:w-1/2 bg-nike-gray-800 p-6">
                <div className="h-full flex flex-col">
                  {/* Main Image */}
                  <div className="flex-1 bg-white rounded-lg overflow-hidden mb-4">
                    <img
                      src={currentImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Images */}
                  {images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                            index === currentImageIndex
                              ? "ring-2 ring-nike-orange"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {product.isNew && (
                          <span className="bg-nike-volt text-nike-black px-2 py-1 rounded-full text-xs font-bold">
                            NEW
                          </span>
                        )}
                        <span className="bg-nike-orange text-nike-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.category}
                        </span>
                      </div>
                      <h1 className="text-2xl font-bold text-nike-white mb-2">
                        {product.name}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-nike-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-nike-gray-400 text-sm">
                          {product.rating} ({Math.floor(Math.random() * 1000)}{" "}
                          reviews)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-nike-gray-800 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-nike-gray-400" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-nike-orange">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-nike-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-nike-white mb-2">
                        Description
                      </h3>
                      <p className="text-nike-gray-400 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Colors */}
                  {product.colors.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-nike-white mb-3">
                        Colors
                      </h3>
                      <div className="flex space-x-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              selectedColor === color
                                ? "border-nike-orange scale-110"
                                : "border-nike-gray-600 hover:border-nike-gray-400"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-nike-white mb-3">
                        Sizes
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-2 px-4 rounded-lg border transition-all ${
                              selectedSize === size
                                ? "border-nike-orange bg-nike-orange text-nike-white"
                                : "border-nike-gray-600 text-nike-gray-300 hover:border-nike-gray-400"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-nike-white mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 bg-nike-gray-800 rounded-lg hover:bg-nike-gray-700 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-nike-white" />
                      </button>
                      <span className="text-nike-white font-semibold w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 bg-nike-gray-800 rounded-lg hover:bg-nike-gray-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-nike-white" />
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-nike-white mb-3">
                        Features
                      </h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-nike-gray-400"
                          >
                            <div className="w-2 h-2 bg-nike-orange rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-4 bg-nike-orange text-nike-white rounded-lg hover:bg-nike-orange/90 transition-colors font-semibold text-lg"
                    >
                      Add to Cart - {formatPrice(product.price * quantity)}
                    </button>
                    <div className="flex space-x-3">
                      <button className="flex-1 py-3 bg-nike-gray-800 text-nike-white rounded-lg hover:bg-nike-gray-700 transition-colors flex items-center justify-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>Wishlist</span>
                      </button>
                      <button className="flex-1 py-3 bg-nike-gray-800 text-nike-white rounded-lg hover:bg-nike-gray-700 transition-colors flex items-center justify-center space-x-2">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetails;
