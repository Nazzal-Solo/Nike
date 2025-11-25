import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Star } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";

interface SearchBarProps {
  onToggleFilters?: () => void;
}

// Sample products data for search
const sampleProducts = [
  {
    id: 1,
    name: "Air Max 270",
    price: 150,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Lifestyle",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Air Jordan 1 Retro",
    price: 170,
    image:
      "https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Basketball",
    rating: 4.9,
  },
  {
    id: 3,
    name: "React Infinity Run",
    price: 160,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Running",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Dri-FIT ADV T-Shirt",
    price: 35,
    image:
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Apparel",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Tech Fleece Hoodie",
    price: 90,
    image:
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Apparel",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Training Shorts",
    price: 45,
    image:
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    category: "Apparel",
    rating: 4.5,
  },
];

const SearchBar: React.FC<SearchBarProps> = ({ onToggleFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { searchState, setQuery } = useSearch();

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  // Filter products based on search query
  useEffect(() => {
    if (searchState.query.trim()) {
      const filtered = sampleProducts.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchState.query.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(searchState.query.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5)); // Show max 5 results
    } else {
      setSearchResults([]);
    }
  }, [searchState.query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="relative flex items-center space-x-2">
      {/* Search Input Container */}
      <motion.div
        className="relative"
        initial={{ width: 48 }}
        animate={{ width: isOpen ? 320 : 48 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchState.query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={`w-full h-12 bg-nike-gray-800/50 backdrop-blur-sm text-nike-white placeholder-nike-gray-400 rounded-xl px-4 pr-14 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nike-orange border border-nike-gray-700/50 hover:border-nike-orange/50 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Search Icon Button */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-nike-gray-400 hover:text-nike-orange transition-all duration-300 p-2 rounded-lg hover:bg-nike-gray-700/50 hover:scale-110 active:scale-95 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* Filter Button */}
      {onToggleFilters && (
        <motion.button
          className="relative p-3 rounded-xl bg-nike-gray-800/50 hover:bg-nike-gray-700/80 backdrop-blur-sm border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
          whileHover={{
            scale: 1.1,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleFilters}
          title="Filters & Sort"
        >
          <Filter className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-300" />
          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      )}

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && searchState.query && (
          <motion.div
            className="absolute top-14 left-0 right-0 bg-nike-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-nike-gray-700/50 z-50 overflow-hidden max-h-96 overflow-y-auto"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Search Header */}
            <div className="p-4 border-b border-nike-gray-700/50">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-nike-orange" />
                <p className="text-nike-gray-300 text-sm font-medium">
                  {searchResults.length > 0
                    ? `Found ${searchResults.length} product${
                        searchResults.length > 1 ? "s" : ""
                      }`
                    : "No products found"}
                </p>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((product) => (
                  <motion.div
                    key={product.id}
                    className="flex items-center space-x-3 p-3 hover:bg-nike-gray-700/50 transition-colors cursor-pointer group"
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      // Scroll to products section and highlight the product
                      const productsSection =
                        document.getElementById("products");
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: "smooth" });
                      }
                      setIsOpen(false);
                    }}
                  >
                    {/* Product Image */}
                    <div className="w-12 h-12 bg-nike-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-nike-white font-semibold text-sm truncate group-hover:text-nike-orange transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-nike-gray-400 text-xs">
                        {product.category}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-nike-gray-400 text-xs">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-nike-orange font-bold text-sm">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="text-nike-gray-400 group-hover:text-nike-orange transition-colors">
                      <Search className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Search className="w-8 h-8 text-nike-gray-600 mx-auto mb-2" />
                <p className="text-nike-gray-400 text-sm">
                  No products found for "{searchState.query}"
                </p>
                <p className="text-nike-gray-500 text-xs mt-1">
                  Try different keywords or check spelling
                </p>
              </div>
            )}

            {/* Search Footer */}
            {searchResults.length > 0 && (
              <div className="p-3 border-t border-nike-gray-700/50 bg-nike-gray-900/50">
                <p className="text-nike-gray-400 text-xs text-center">
                  Click on a product to view details
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
