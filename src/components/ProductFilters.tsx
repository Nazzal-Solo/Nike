import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const {
    searchState,
    setCategory,
    setPriceRange,
    setSortBy,
    setShowNewOnly,
    setSelectedColors,
    setSelectedSizes,
    clearFilters,
  } = useSearch();

  // Get unique categories, colors, and sizes from products
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const colors = [...new Set(products.flatMap((p) => p.colors))];
  const sizes = [...new Set(products.flatMap((p) => p.sizes || []))];

  const handleColorToggle = (color: string) => {
    const newColors = searchState.selectedColors.includes(color)
      ? searchState.selectedColors.filter((c) => c !== color)
      : [...searchState.selectedColors, color];
    setSelectedColors(newColors);
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = searchState.selectedSizes.includes(size)
      ? searchState.selectedSizes.filter((s) => s !== size)
      : [...searchState.selectedSizes, size];
    setSelectedSizes(newSizes);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Filters Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-nike-gray-900 to-nike-black border-l border-nike-orange/30 z-50 overflow-y-auto shadow-2xl"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-nike-orange/20 rounded-lg">
                    <SlidersHorizontal className="w-6 h-6 text-nike-orange" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-nike-white">
                      Filters
                    </h3>
                    <p className="text-nike-gray-400 text-sm">
                      Refine your search
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-3 hover:bg-nike-gray-800/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-nike-gray-400 group-hover:text-nike-orange transition-colors" />
                </motion.button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-nike-orange rounded-full"></div>
                  <h4 className="text-lg font-bold text-nike-white">
                    Category
                  </h4>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <motion.label
                      key={category}
                      className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-nike-gray-800/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={searchState.category === category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-5 h-5 text-nike-orange bg-nike-gray-800 border-2 border-nike-gray-600 focus:ring-2 focus:ring-nike-orange focus:ring-offset-2 focus:ring-offset-nike-gray-900"
                        />
                        {searchState.category === category && (
                          <motion.div
                            className="absolute inset-0 w-5 h-5 bg-nike-orange rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <span className="text-nike-gray-300 capitalize font-medium group-hover:text-nike-white transition-colors">
                        {category === "all" ? "All Products" : category}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-nike-volt rounded-full"></div>
                  <h4 className="text-lg font-bold text-nike-white">
                    Price Range
                  </h4>
                </div>
                <div className="bg-nike-gray-800/50 rounded-2xl p-6 space-y-6 border-2 border-nike-gray-600/50 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-nike-orange font-bold text-lg min-w-[60px]">
                        ${searchState.priceRange[0]}
                      </span>
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={searchState.priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              parseInt(e.target.value),
                              searchState.priceRange[1],
                            ])
                          }
                          className="w-full h-3 bg-nike-gray-700 rounded-lg appearance-none cursor-pointer slider border border-nike-gray-500"
                        />
                      </div>
                      <span className="text-nike-gray-400 text-sm">Min</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-nike-volt font-bold text-lg min-w-[60px]">
                        ${searchState.priceRange[1]}
                      </span>
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={searchState.priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              searchState.priceRange[0],
                              parseInt(e.target.value),
                            ])
                          }
                          className="w-full h-3 bg-nike-gray-700 rounded-lg appearance-none cursor-pointer slider border border-nike-gray-500"
                        />
                      </div>
                      <span className="text-nike-gray-400 text-sm">Max</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-nike-orange/10 rounded-xl border border-nike-orange/20">
                    <div className="text-nike-orange font-bold text-lg">
                      ${searchState.priceRange[0]} - $
                      {searchState.priceRange[1]}
                    </div>
                    <div className="text-nike-gray-400 text-sm">
                      Price Range
                    </div>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-nike-white rounded-full"></div>
                  <h4 className="text-lg font-bold text-nike-white">Sort By</h4>
                </div>
                <div className="bg-nike-gray-800/50 rounded-2xl p-4">
                  <select
                    value={searchState.sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-4 bg-nike-gray-700 text-nike-white rounded-xl border-2 border-nike-gray-600 focus:outline-none focus:ring-2 focus:ring-nike-orange focus:border-nike-orange transition-all duration-300 font-medium"
                  >
                    <option value="name">📝 Name A-Z</option>
                    <option value="price-low">💰 Price: Low to High</option>
                    <option value="price-high">💎 Price: High to Low</option>
                    <option value="rating">⭐ Highest Rated</option>
                    <option value="newest">🆕 Newest First</option>
                  </select>
                </div>
              </div>

              {/* Colors */}
              {colors.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                    <h4 className="text-lg font-bold text-nike-white">
                      Colors
                    </h4>
                  </div>
                  <div className="bg-nike-gray-800/50 rounded-2xl p-4">
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <motion.button
                          key={color}
                          onClick={() => handleColorToggle(color)}
                          className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${
                            searchState.selectedColors.includes(color)
                              ? "bg-nike-orange text-nike-white shadow-lg shadow-nike-orange/30"
                              : "bg-nike-gray-700 text-nike-gray-300 hover:bg-nike-gray-600 hover:text-nike-white"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white/30"
                            style={{ backgroundColor: color }}
                          />
                          <span>{color}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <h4 className="text-lg font-bold text-nike-white">Sizes</h4>
                  </div>
                  <div className="bg-nike-gray-800/50 rounded-2xl p-4">
                    <div className="flex flex-wrap gap-3">
                      {sizes.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => handleSizeToggle(size)}
                          className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                            searchState.selectedSizes.includes(size)
                              ? "bg-nike-volt text-nike-black shadow-lg shadow-nike-volt/30"
                              : "bg-nike-gray-700 text-nike-gray-300 hover:bg-nike-gray-600 hover:text-nike-white"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* New Products Only */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-nike-white">
                    Special Filters
                  </h4>
                </div>
                <div className="bg-nike-gray-800/50 rounded-2xl p-4">
                  <motion.label
                    className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-nike-gray-700/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={searchState.showNewOnly}
                        onChange={(e) => setShowNewOnly(e.target.checked)}
                        className="w-5 h-5 text-nike-orange bg-nike-gray-700 border-2 border-nike-gray-600 focus:ring-2 focus:ring-nike-orange focus:ring-offset-2 focus:ring-offset-nike-gray-800 rounded"
                      />
                      {searchState.showNewOnly && (
                        <motion.div
                          className="absolute inset-0 w-5 h-5 bg-nike-orange rounded"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🆕</span>
                      <span className="text-nike-gray-300 font-medium group-hover:text-nike-white transition-colors">
                        New Products Only
                      </span>
                    </div>
                  </motion.label>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(searchState.category !== "all" ||
                searchState.priceRange[0] !== 0 ||
                searchState.priceRange[1] !== 1000 ||
                searchState.showNewOnly ||
                searchState.selectedColors.length > 0 ||
                searchState.selectedSizes.length > 0) && (
                <motion.div
                  className="mb-8 p-6 bg-gradient-to-r from-nike-orange/10 to-nike-volt/10 border border-nike-orange/30 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-nike-orange rounded-full animate-pulse"></div>
                    <h4 className="text-nike-orange font-bold text-lg">
                      Active Filters
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    {searchState.category !== "all" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-nike-gray-400">Category:</span>
                        <span className="text-nike-white font-medium">
                          {searchState.category}
                        </span>
                      </div>
                    )}
                    {(searchState.priceRange[0] !== 0 ||
                      searchState.priceRange[1] !== 1000) && (
                      <div className="flex items-center space-x-2">
                        <span className="text-nike-gray-400">Price:</span>
                        <span className="text-nike-white font-medium">
                          ${searchState.priceRange[0]} - $
                          {searchState.priceRange[1]}
                        </span>
                      </div>
                    )}
                    {searchState.showNewOnly && (
                      <div className="flex items-center space-x-2">
                        <span className="text-nike-gray-400">Filter:</span>
                        <span className="text-nike-white font-medium">
                          New Products Only
                        </span>
                      </div>
                    )}
                    {searchState.selectedColors.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-nike-gray-400">Colors:</span>
                        <span className="text-nike-white font-medium">
                          {searchState.selectedColors.length} selected
                        </span>
                      </div>
                    )}
                    {searchState.selectedSizes.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-nike-gray-400">Sizes:</span>
                        <span className="text-nike-white font-medium">
                          {searchState.selectedSizes.length} selected
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  onClick={clearFilters}
                  className="flex-1 py-4 bg-nike-gray-800 text-nike-white rounded-xl hover:bg-nike-gray-700 transition-all duration-300 font-bold flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>🗑️</span>
                  <span>Clear All</span>
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="flex-1 py-4 bg-gradient-to-r from-nike-orange to-nike-volt text-nike-white rounded-xl hover:from-nike-orange/90 hover:to-nike-volt/90 transition-all duration-300 font-bold flex items-center justify-center space-x-2 shadow-lg shadow-nike-orange/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>✅</span>
                  <span>Apply Filters</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductFilters;
