import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  Sun,
  Moon,
  Star,
  Zap,
  Globe,
  Users,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Filter,
} from "lucide-react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { CartProvider, useCart } from "./contexts/CartContext";
import { SearchProvider, useSearch } from "./contexts/SearchContext";
import SearchBar from "./components/SearchBar";
import ProductFilters from "./components/ProductFilters";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";

// Product data
const products = [
  {
    id: 1,
    name: "Air Max 270",
    price: 150,
    originalPrice: 180,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Lifestyle",
    rating: 4.8,
    isNew: true,
    colors: ["#000000", "#ffffff", "#ff5a00"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    description:
      "The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
    features: [
      "Full-length Max Air unit for maximum cushioning",
      "Mesh upper for breathability",
      "Rubber outsole for durability",
      "Lightweight design",
    ],
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      "https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Air Jordan 1 Retro",
    price: 170,
    originalPrice: 200,
    image:
      "https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Basketball",
    rating: 4.9,
    isNew: false,
    colors: ["#000000", "#ff0000", "#ffffff"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    description:
      "The Air Jordan 1 Retro High OG is a basketball shoe that debuted in 1985. It was designed by Peter Moore and was the first signature shoe for Michael Jordan.",
    features: [
      "Premium leather upper",
      "Air-Sole unit for cushioning",
      "High-top design for ankle support",
      "Classic Jordan branding",
    ],
    images: [
      "https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    ],
  },
  {
    id: 3,
    name: "React Infinity Run",
    price: 160,
    originalPrice: 190,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Running",
    rating: 4.7,
    isNew: true,
    colors: ["#00ff85", "#000000", "#ffffff"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    description:
      "The Nike React Infinity Run is designed to help reduce injury and keep you running. It's built for comfort and durability.",
    features: [
      "React foam for responsive cushioning",
      "Flyknit upper for breathability",
      "Wide platform for stability",
      "Durable rubber outsole",
    ],
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      "https://images.pexels.com/photos/1280064/pexels-photo-1280064.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Dri-FIT ADV T-Shirt",
    price: 35,
    originalPrice: 45,
    image:
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Apparel",
    rating: 4.6,
    isNew: false,
    colors: ["#000000", "#ffffff", "#ff5a00"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The Nike Dri-FIT ADV T-Shirt is made with advanced moisture-wicking fabric to keep you dry and comfortable during your workout.",
    features: [
      "Dri-FIT technology for moisture management",
      "Lightweight and breathable",
      "Comfortable fit",
      "Machine washable",
    ],
    images: [
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    ],
  },
  {
    id: 5,
    name: "Tech Fleece Hoodie",
    price: 90,
    originalPrice: 120,
    image:
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Apparel",
    rating: 4.8,
    isNew: true,
    colors: ["#000000", "#ffffff", "#ff5a00"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The Nike Tech Fleece Hoodie combines warmth and style with its innovative fleece construction and modern design.",
    features: [
      "Tech Fleece construction for warmth",
      "Zippered pockets for storage",
      "Adjustable hood",
      "Comfortable fit",
    ],
    images: [
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    ],
  },
  {
    id: 6,
    name: "Training Shorts",
    price: 45,
    originalPrice: 60,
    image:
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    category: "Apparel",
    rating: 4.5,
    isNew: false,
    colors: ["#000000", "#ffffff", "#00ff85"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "The Nike Training Shorts are designed for performance with moisture-wicking fabric and a comfortable fit for any workout.",
    features: [
      "Dri-FIT technology",
      "Elastic waistband",
      "Side pockets",
      "Lightweight construction",
    ],
    images: [
      "https://images.pexels.com/photos/8844893/pexels-photo-8844893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    ],
  },
];

const athletes = [
  {
    name: "Michael Jordan",
    sport: "Basketball Legend",
    image:
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    quote:
      "I've failed over and over again in my life. And that is why I succeed.",
    achievements: "6x NBA Champion",
  },
  {
    name: "Serena Williams",
    sport: "Tennis Champion",
    image:
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    quote: "The success of every woman should be the inspiration to another.",
    achievements: "23x Grand Slam Winner",
  },
  {
    name: "LeBron James",
    sport: "Basketball Star",
    image:
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    quote: "You have to be able to accept failure to get better.",
    achievements: "4x NBA Champion",
  },
  {
    name: "Cristiano Ronaldo",
    sport: "Football Icon",
    image:
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop",
    quote: "Your love makes me strong, your hate makes me unstoppable.",
    achievements: "5x Ballon d'Or Winner",
  },
];

// Navigation Component
interface NavigationProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  showFilters,
  setShowFilters,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDark, toggleTheme } = useTheme();
  const { state: cartState, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "products",
        "innovation",
        "athletes",
        "about",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "innovation", label: "Innovation" },
    { id: "athletes", label: "Athletes" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        activeSection !== "home"
          ? "bg-black/95 backdrop-blur-md border-b border-nike-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-black text-nike-white">NIKE</div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-lg font-semibold transition-colors relative ${
                  activeSection === item.id
                    ? "text-nike-orange"
                    : "text-nike-white hover:text-nike-orange"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-nike-orange"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search Bar */}
            <SearchBar onToggleFilters={() => setShowFilters(!showFilters)} />

            {/* Cart Button */}
            <motion.button
              onClick={toggleCart}
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-nike-gray-800/50 hover:bg-nike-gray-700/80 backdrop-blur-sm border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-300" />
              {cartState.itemCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-nike-orange text-nike-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-nike-black"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {cartState.itemCount > 99 ? "99+" : cartState.itemCount}
                </motion.span>
              )}
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-nike-gray-800/50 hover:bg-nike-gray-700/80 backdrop-blur-sm border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-300" />
              )}

              {/* Enhanced Theme indicator */}
              <motion.div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full shadow-lg ${
                  isDark ? "bg-nike-orange" : "bg-nike-volt"
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl bg-nike-gray-800/50 hover:bg-nike-gray-700/80 backdrop-blur-sm border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              title="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-300" />
              ) : (
                <Menu className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-300" />
              )}
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0 }}
        className="md:hidden bg-black/95 backdrop-blur-md border-t border-nike-gray-800 overflow-hidden"
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-lg font-semibold transition-colors w-full text-left ${
                activeSection === item.id
                  ? "text-nike-orange"
                  : "text-nike-white hover:text-nike-orange"
              }`}
              whileHover={{ x: 10 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
          }}
        ></div>
      </div>

      <div
        className="relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-nike-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            NIKE
          </motion.div>
          <motion.div
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-nike-orange"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            JUST DO IT
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl mb-12 text-nike-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            Unleash your potential with Nike's revolutionary athletic gear.
            Performance meets style in every step.
          </motion.p>
          <motion.button
            className="bg-nike-orange hover:bg-nike-orange/90 text-nike-white text-xl font-bold px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-nike-glow group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: "auto" }}
          >
            SHOP NOW
            <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        whileHover={{
          scale: 1.3,
          y: -8,
        }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const productsSection = document.getElementById("products");
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Scroll Text */}
          <motion.span
            className="text-nike-white text-sm font-bold tracking-wider opacity-80 group-hover:opacity-100 group-hover:text-nike-orange transition-all duration-500"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.2,
              color: "#ff5a00",
            }}
          >
            SCROLL
          </motion.span>

          {/* Modern Scroll Icon */}
          <motion.div
            className="relative"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              y: [0, 12, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {/* Outer Ring with Glow Effect */}
            <motion.div
              className="w-14 h-14 border-2 border-nike-white/60 rounded-full flex items-center justify-center group-hover:border-nike-orange transition-all duration-500 group-hover:shadow-xl group-hover:shadow-nike-orange/70"
              whileHover={{
                scale: 1.4,
                rotate: 360,
                transition: { duration: 0.6 },
              }}
            >
              {/* Inner Dot with Pulse */}
              <motion.div
                className="w-3 h-3 bg-nike-white rounded-full group-hover:bg-nike-orange transition-all duration-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: [1.8, 2.5, 1.8],
                  transition: { duration: 0.6, repeat: Infinity },
                }}
              />
            </motion.div>

            {/* Enhanced Animated Lines */}
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                opacity: [0, 1, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity },
              }}
            >
              <div className="w-1 h-6 bg-gradient-to-b from-nike-white via-nike-orange to-transparent group-hover:from-nike-orange group-hover:via-nike-white group-hover:to-transparent transition-all duration-500"></div>
            </motion.div>
          </motion.div>

          {/* Enhanced Down Arrow */}
          <motion.div
            className="mt-3"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              y: [0, 12, 0],
              scale: 1.4,
              transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <motion.svg
              className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-all duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{
                rotate: 180,
                transition: { duration: 0.5 },
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.div>

          {/* Additional Hover Effects */}
          <motion.div
            className="absolute inset-0 rounded-full bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            whileHover={{
              scale: 2,
              opacity: 0.1,
              transition: { duration: 0.3 },
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: any;
  index: number;
  onViewDetails?: () => void;
}> = ({ product, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-nike-orange/50 transition-all duration-300 hover:shadow-glass hover:shadow-nike-orange/20">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="bg-nike-volt text-nike-black px-3 py-1 rounded-full text-sm font-bold">
                NEW
              </span>
            )}
            <span className="bg-nike-orange text-nike-white px-3 py-1 rounded-full text-sm font-bold">
              {product.category}
            </span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex space-x-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 bg-nike-orange text-nike-white font-bold py-3 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ADD TO CART
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.();
              }}
              className="px-4 bg-nike-gray-800 text-nike-white font-bold py-3 rounded-lg transition-all duration-300 hover:bg-nike-gray-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW
            </motion.button>
          </motion.div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-nike-white mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-nike-orange">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-nike-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-nike-gray-300 font-semibold">
                {product.rating}
              </span>
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            {product.colors.slice(0, 3).map((color: string, i: number) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-nike-gray-600"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-nike-gray-600 bg-nike-gray-700 flex items-center justify-center">
                <span className="text-xs text-nike-gray-400">
                  +{product.colors.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Products Section
interface ProductsSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  showFilters,
  setShowFilters,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { filterProducts, searchState, clearFilters } = useSearch();

  const filteredProducts = filterProducts(products);

  // Check if any filters are active
  const hasActiveFilters =
    searchState.query.trim() !== "" ||
    searchState.category !== "all" ||
    searchState.priceRange[0] !== 0 ||
    searchState.priceRange[1] !== 1000 ||
    searchState.showNewOnly ||
    searchState.selectedColors.length > 0 ||
    searchState.selectedSizes.length > 0;

  return (
    <section id="products" className="py-20 bg-nike-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-nike-white mb-4">
            LATEST COLLECTION
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            Discover our newest innovations in athletic footwear, apparel, and
            equipment designed for peak performance.
          </p>
        </motion.div>

        {/* Filter Status and Controls */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filter Toggle for Mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full py-4 bg-gradient-to-r from-nike-gray-800 to-nike-gray-700 text-nike-white rounded-xl hover:from-nike-gray-700 hover:to-nike-gray-600 transition-all duration-300 flex items-center justify-center space-x-3 font-bold shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-1 bg-nike-orange/20 rounded-lg">
                <Filter className="w-5 h-5 text-nike-orange" />
              </div>
              <span>Filters & Sort</span>
              <div className="w-2 h-2 bg-nike-orange rounded-full animate-pulse"></div>
            </motion.button>
          </div>

          {/* Filter Status */}
          <div className="flex items-center space-x-4">
            <div className="text-nike-gray-400">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-nike-orange rounded-full animate-pulse"></div>
                <span className="text-nike-orange text-sm font-medium">
                  Filters Active
                </span>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 p-4 bg-nike-gray-800/50 rounded-lg border border-nike-gray-700">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-nike-gray-400">Active filters:</span>
                {searchState.category !== "all" && (
                  <span className="px-2 py-1 bg-nike-orange/20 text-nike-orange rounded-full">
                    {searchState.category}
                  </span>
                )}
                {(searchState.priceRange[0] !== 0 ||
                  searchState.priceRange[1] !== 1000) && (
                  <span className="px-2 py-1 bg-nike-orange/20 text-nike-orange rounded-full">
                    ${searchState.priceRange[0]}-${searchState.priceRange[1]}
                  </span>
                )}
                {searchState.showNewOnly && (
                  <span className="px-2 py-1 bg-nike-orange/20 text-nike-orange rounded-full">
                    New Only
                  </span>
                )}
                {searchState.selectedColors.length > 0 && (
                  <span className="px-2 py-1 bg-nike-orange/20 text-nike-orange rounded-full">
                    {searchState.selectedColors.length} colors
                  </span>
                )}
                {searchState.selectedSizes.length > 0 && (
                  <span className="px-2 py-1 bg-nike-orange/20 text-nike-orange rounded-full">
                    {searchState.selectedSizes.length} sizes
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="px-2 py-1 bg-nike-gray-700 text-nike-gray-300 rounded-full hover:bg-nike-gray-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onViewDetails={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-nike-white mb-4">
              No products found
            </h3>
            <p className="text-nike-gray-400 mb-6">
              Try adjusting your filters or search terms.
            </p>
            <motion.button
              onClick={clearFilters}
              className="px-6 py-3 bg-nike-orange text-nike-white rounded-lg hover:bg-nike-orange/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All Filters
            </motion.button>
          </div>
        )}
      </div>

      {/* Product Filters */}
      <ProductFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        products={products}
      />

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

// Innovation Section
const InnovationSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="innovation" className="py-20 bg-nike-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-nike-white mb-4">
            INNOVATION
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            Pushing the boundaries of athletic performance through cutting-edge
            technology and sustainable design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Zap,
              title: "AIR TECHNOLOGY",
              description:
                "Revolutionary air cushioning system providing maximum comfort and energy return with every step.",
              gradient: "from-nike-orange to-red-600",
            },
            {
              icon: Globe,
              title: "SUSTAINABILITY",
              description:
                "Committed to creating products with recycled materials and reducing our environmental impact.",
              gradient: "from-nike-volt to-teal-600",
            },
            {
              icon: Users,
              title: "ATHLETE INSIGHTS",
              description:
                "Designed with input from world-class athletes to meet the demands of elite performance.",
              gradient: "from-purple-500 to-pink-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`bg-gradient-to-br ${item.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-nike-orange/50`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-nike-white mb-4">
                {item.title}
              </h3>
              <p className="text-nike-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={ref}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-nike-white mb-6">
                THE FUTURE OF{" "}
                <span className="text-nike-orange">ATHLETIC PERFORMANCE</span>
              </h3>
              <p className="text-nike-gray-400 text-lg leading-relaxed mb-8">
                Nike continues to push boundaries with breakthrough innovations
                in materials science, biomechanics, and digital integration.
                From adaptive fit technology to sustainable manufacturing
                processes, we're creating the next generation of athletic gear.
              </p>
              <motion.button
                className="bg-nike-volt hover:bg-nike-volt/90 text-nike-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-volt-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EXPLORE INNOVATION
              </motion.button>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Nike Innovation"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Athletes Section
const AthletesSection: React.FC = () => {
  return (
    <section id="athletes" className="py-20 bg-nike-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-nike-white mb-4">
            ATHLETES & COMMUNITY
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            Inspiring greatness through partnerships with world-class athletes
            who push the limits of human potential.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {athletes.map((athlete, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-nike-orange/50 transition-all duration-300 hover:shadow-glass hover:shadow-nike-orange/20 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <motion.img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-nike-white mb-1">
                        {athlete.name}
                      </h3>
                      <p className="text-nike-orange font-semibold text-sm mb-1">
                        {athlete.sport}
                      </p>
                      <p className="text-nike-volt text-xs font-medium">
                        {athlete.achievements}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <p className="text-nike-gray-400 italic leading-relaxed text-sm">
                      "{athlete.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-nike-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-nike-white mb-8">
              ABOUT NIKE
            </h2>
            <div className="space-y-6 text-nike-gray-400 text-lg leading-relaxed">
              <p>
                Since 1971, Nike has been inspiring athletes around the world
                with innovative design, breakthrough technology, and a
                relentless pursuit of excellence. What started as a
                revolutionary running shoe company has evolved into the world's
                leading sports brand.
              </p>
              <p>
                Our mission is simple: to bring inspiration and innovation to
                every athlete in the world. If you have a body, you are an
                athlete. We believe in the power of sport to move the world
                forward.
              </p>
              <p>
                From iconic Air technology to sustainable materials, Nike
                continues to push boundaries and create products that help
                athletes of all levels achieve their potential.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-nike-orange">50+</div>
                <div className="text-nike-gray-400">Years of Innovation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-nike-volt">190+</div>
                <div className="text-nike-gray-400">Countries Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-nike-white">
                  75,000+
                </div>
                <div className="text-nike-gray-400">Global Employees</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop"
              alt="Nike Heritage"
              className="rounded-3xl shadow-2xl"
            />
            <motion.div
              className="absolute -bottom-6 -right-6 bg-nike-orange text-nike-white p-6 rounded-2xl shadow-2xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-black">"JUST DO IT"</div>
              <div className="text-sm">Since 1988</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-nike-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-nike-white mb-4">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            Find your nearest Nike store or connect with us to stay updated on
            the latest releases and innovations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Store Locator */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-nike-orange mr-4" />
              <h3 className="text-2xl font-bold text-nike-white">
                Find a Store
              </h3>
            </div>
            <p className="text-nike-gray-400 mb-6">
              Locate your nearest Nike store and discover our latest collections
              in person.
            </p>
            <div className="bg-nike-gray-800 rounded-2xl h-64 flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-nike-orange mx-auto mb-4" />
                <p className="text-nike-gray-400">Interactive Store Map</p>
              </div>
            </div>
            <motion.button
              className="w-full bg-nike-orange hover:bg-nike-orange/90 text-nike-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              FIND STORES NEAR YOU
            </motion.button>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Mail className="w-8 h-8 text-nike-volt mr-4" />
              <h3 className="text-2xl font-bold text-nike-white">
                Stay Connected
              </h3>
            </div>
            <p className="text-nike-gray-400 mb-6">
              Subscribe to our newsletter for exclusive offers, new releases,
              and athletic inspiration.
            </p>

            <form className="space-y-4 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-nike-gray-800 text-nike-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nike-orange transition-all border border-nike-gray-700"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-nike-volt hover:bg-nike-volt/90 text-nike-black font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SUBSCRIBE NOW
              </motion.button>
            </form>

            <div className="space-y-4">
              <div className="flex items-center text-nike-gray-400">
                <Phone className="w-5 h-5 mr-3" />
                <span>1-800-NIKE-1 (1-800-654-3435)</span>
              </div>
              <div className="flex items-center text-nike-gray-400">
                <Mail className="w-5 h-5 mr-3" />
                <span>support@nike.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-nike-black py-12 border-t border-nike-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-3xl font-black text-nike-white mb-4">NIKE</div>
            <p className="text-nike-gray-400 mb-4">
              Bringing inspiration and innovation to every athlete in the world.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-nike-gray-400 hover:text-nike-orange transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-nike-gray-400 hover:text-nike-orange transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-nike-gray-400 hover:text-nike-orange transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-nike-gray-400 hover:text-nike-orange transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-nike-white mb-4">Products</h4>
            <ul className="space-y-2 text-nike-gray-400">
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Shoes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Clothing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Equipment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-nike-white mb-4">Sports</h4>
            <ul className="space-y-2 text-nike-gray-400">
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Running
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Basketball
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Football
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Training
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-nike-white mb-4">Support</h4>
            <ul className="space-y-2 text-nike-gray-400">
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-nike-white transition-colors">
                  Shipping
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-nike-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-nike-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Nike, Inc. All Rights Reserved.
          </div>
          <div className="text-nike-gray-500 text-xs">
            Developed by{" "}
            <span className="text-nike-orange font-semibold">Fusion Mind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <SearchProvider>
          <div className="bg-nike-black text-nike-white overflow-x-hidden transition-colors duration-300 min-h-screen">
            <Navigation
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            <HeroSection />
            <ProductsSection
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            <InnovationSection />
            <AthletesSection />
            <AboutSection />
            <ContactSection />
            <Footer />

            {/* Shopping Cart */}
            <ShoppingCart />
          </div>
        </SearchProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
