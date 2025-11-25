import React, { createContext, useContext, useState, useMemo } from "react";

export interface Product {
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

interface SearchState {
  query: string;
  category: string;
  priceRange: [number, number];
  sortBy: "name" | "price-low" | "price-high" | "rating" | "newest";
  showNewOnly: boolean;
  selectedColors: string[];
  selectedSizes: string[];
}

interface SearchContextType {
  searchState: SearchState;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: SearchState["sortBy"]) => void;
  setShowNewOnly: (show: boolean) => void;
  setSelectedColors: (colors: string[]) => void;
  setSelectedSizes: (sizes: string[]) => void;
  clearFilters: () => void;
  filterProducts: (products: Product[]) => Product[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    category: "all",
    priceRange: [0, 1000],
    sortBy: "name",
    showNewOnly: false,
    selectedColors: [],
    selectedSizes: [],
  });

  const setQuery = (query: string) => {
    setSearchState((prev) => ({ ...prev, query }));
  };

  const setCategory = (category: string) => {
    setSearchState((prev) => ({ ...prev, category }));
  };

  const setPriceRange = (range: [number, number]) => {
    setSearchState((prev) => ({ ...prev, priceRange: range }));
  };

  const setSortBy = (sortBy: SearchState["sortBy"]) => {
    setSearchState((prev) => ({ ...prev, sortBy }));
  };

  const setShowNewOnly = (show: boolean) => {
    setSearchState((prev) => ({ ...prev, showNewOnly: show }));
  };

  const setSelectedColors = (colors: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedColors: colors }));
  };

  const setSelectedSizes = (sizes: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedSizes: sizes }));
  };

  const clearFilters = () => {
    setSearchState({
      query: "",
      category: "all",
      priceRange: [0, 1000],
      sortBy: "name",
      showNewOnly: false,
      selectedColors: [],
      selectedSizes: [],
    });
  };

  const filterProducts = (products: Product[]): Product[] => {
    let filtered = products.filter((product) => {
      // Search query - enhanced to search in name, category, and description
      if (searchState.query.trim()) {
        const query = searchState.query.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDescription =
          product.description?.toLowerCase().includes(query) || false;

        if (!matchesName && !matchesCategory && !matchesDescription) {
          return false;
        }
      }

      // Category filter
      if (
        searchState.category !== "all" &&
        product.category !== searchState.category
      ) {
        return false;
      }

      // Price range
      if (
        product.price < searchState.priceRange[0] ||
        product.price > searchState.priceRange[1]
      ) {
        return false;
      }

      // New products only
      if (searchState.showNewOnly && !product.isNew) {
        return false;
      }

      // Color filter
      if (searchState.selectedColors.length > 0) {
        const hasMatchingColor = searchState.selectedColors.some((color) =>
          product.colors.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      // Size filter
      if (searchState.selectedSizes.length > 0 && product.sizes) {
        const hasMatchingSize = searchState.selectedSizes.some((size) =>
          product.sizes!.includes(size)
        );
        if (!hasMatchingSize) return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (searchState.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew ? 1 : -1;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  return (
    <SearchContext.Provider
      value={{
        searchState,
        setQuery,
        setCategory,
        setPriceRange,
        setSortBy,
        setShowNewOnly,
        setSelectedColors,
        setSelectedSizes,
        clearFilters,
        filterProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
