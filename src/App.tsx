import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  ArrowUp,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Filter,
  ChevronDown,
} from "lucide-react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { CartProvider, useCart } from "./contexts/CartContext";
import { SearchProvider, useSearch } from "./contexts/SearchContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
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

// Enhanced Navigation Component
interface NavigationProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = React.memo(({
  showFilters,
  setShowFilters,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { state: cartState, toggleCart } = useCart();
  const { language, isRTL, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["home", "products", "innovation", "athletes", "about", "contact"];
      const scrollPosition = window.scrollY + 150;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  }, []);

  const navItems = useMemo(
    () => [
      { id: "home", label: t("home") },
      { id: "products", label: t("products") },
      { id: "innovation", label: t("innovation") },
      { id: "athletes", label: t("athletes") },
      { id: "about", label: t("about") },
      { id: "contact", label: t("contact") },
    ],
    [t]
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || activeSection !== "home"
          ? "bg-black/95 backdrop-blur-xl border-b border-nike-gray-800/50 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="flex items-center space-x-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="text-3xl font-black text-nike-white relative"
              whileHover={{ x: 5 }}
            >
              NIKE
              <motion.div
                className="absolute -bottom-1 left-0 h-1 bg-nike-orange"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
          </motion.div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-lg font-semibold transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? "text-nike-orange"
                    : "text-nike-white/80 hover:text-nike-white"
                }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-nike-orange rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {activeSection !== item.id && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-nike-orange/0 rounded-full"
                    whileHover={{ width: "80%", left: "10%", backgroundColor: "rgba(255, 90, 0, 0.5)" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className={`hidden md:flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
            <SearchBar onToggleFilters={() => setShowFilters(!showFilters)} />

            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-nike-gray-800/60 hover:bg-nike-gray-700/80 backdrop-blur-md border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              title={language === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <Globe className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-colors duration-300" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-nike-orange shadow-lg"
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
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-nike-white bg-nike-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {language === "en" ? "العربية" : "English"}
              </span>
              <motion.div
                className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            <motion.button
              onClick={toggleCart}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-nike-gray-800/60 hover:bg-nike-gray-700/80 backdrop-blur-md border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-colors duration-300" />
              {cartState.itemCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-nike-orange text-nike-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-nike-black"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {cartState.itemCount > 99 ? "99+" : cartState.itemCount}
                </motion.span>
              )}
              <motion.div
                className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-nike-gray-800/60 hover:bg-nike-gray-700/80 backdrop-blur-md border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-colors duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-colors duration-300" />
              )}
              <motion.div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full shadow-lg ${
                  isDark ? "bg-nike-orange" : "bg-nike-volt"
                }`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl bg-nike-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl bg-nike-gray-800/60 hover:bg-nike-gray-700/80 backdrop-blur-md border border-nike-gray-700/50 hover:border-nike-orange/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-colors duration-300" />
              ) : (
                <Menu className="w-5 h-5 text-nike-white group-hover:text-nike-orange transition-colors duration-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        className="md:hidden bg-black/98 backdrop-blur-xl border-t border-nike-gray-800/50 overflow-hidden"
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-lg font-semibold transition-colors w-full ${isRTL ? "text-right" : "text-left"} px-4 py-2 rounded-lg ${
                activeSection === item.id
                  ? "text-nike-orange bg-nike-orange/10"
                  : "text-nike-white/80 hover:text-nike-white hover:bg-nike-gray-800/50"
              }`}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : (isRTL ? 20 : -20) }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: isRTL ? -10 : 10 }}
            >
              {item.label}
            </motion.button>
          ))}
          {/* Language Switcher in Mobile Menu */}
          <motion.button
            onClick={toggleLanguage}
            className={`block text-lg font-semibold transition-colors w-full ${isRTL ? "text-right" : "text-left"} px-4 py-2 rounded-lg text-nike-white/80 hover:text-nike-white hover:bg-nike-gray-800/50`}
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : (isRTL ? 20 : -20) }}
            transition={{ delay: navItems.length * 0.1 }}
            whileHover={{ x: isRTL ? -10 : 10 }}
          >
            {language === "en" ? "العربية" : "English"}
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";

// Enhanced Hero Section with Parallax
const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { t, isRTL } = useLanguage();

  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32"
    >
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
            y: y1,
            scale: 1.1,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"
          style={{ opacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-20"
        style={{ y: y2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
          >
            <span className="bg-gradient-to-r from-nike-white via-nike-white to-nike-orange bg-clip-text text-transparent">
              NIKE
            </span>
          </motion.div>
          
          <motion.div
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="bg-gradient-to-r from-nike-orange via-nike-orange to-nike-volt bg-clip-text text-transparent">
              {t("justDoIt")}
            </span>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl mb-12 text-nike-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {t("heroDescription")}
            <br className="hidden md:block" />
            <span className="text-nike-white/90"> {t("heroSubDescription")}</span>
          </motion.p>
          
          <motion.button
            className="group relative bg-nike-orange hover:bg-nike-orange/90 text-nike-white text-xl font-bold px-12 py-4 rounded-full transition-all duration-300 mb-8 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProducts}
          >
            <span className="relative z-10 flex items-center">
              {t("shopNow")}
              <ArrowRight className={`${isRTL ? "mr-2 rotate-180" : "ml-2"} w-6 h-6 group-hover:translate-x-1 transition-transform duration-300`} />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-nike-orange to-nike-volt opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-nike-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto w-fit cursor-pointer group z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToProducts}
      >
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            className="w-10 h-16 rounded-full border-2 border-nike-white/30 backdrop-blur-sm bg-white/5 group-hover:border-nike-orange/80 group-hover:bg-nike-orange/10 transition-all duration-500 relative overflow-hidden"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 rounded-full bg-nike-white/60 group-hover:bg-nike-orange"
              animate={{
                y: [0, 10, 0],
                opacity: [0.6, 1, 0.6],
              }}
                transition={{
                duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            <motion.div
              className="absolute inset-0 rounded-full bg-nike-orange/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
          </motion.div>

          <motion.span
            className="text-nike-white/50 text-xs font-semibold tracking-[0.2em] uppercase group-hover:text-nike-orange transition-all duration-500"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("scroll")}
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

// Enhanced Product Card Component
interface ProductCardProps {
  product: typeof products[0];
  index: number;
  onViewDetails?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  index,
  onViewDetails,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { t, isRTL } = useLanguage();

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, []);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    },
    [product, addItem]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
      whileHover={{ y: -8 }}
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-nike-orange/50 transition-all duration-500 hover:shadow-2xl hover:shadow-nike-orange/20 h-full">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {product.isNew && (
              <motion.span
                className="bg-nike-volt text-nike-black px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {t("new")}
              </motion.span>
            )}
            <motion.span
              className="bg-nike-orange/90 text-nike-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {product.category}
            </motion.span>
          </div>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex space-x-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 bg-nike-orange text-nike-white font-bold py-3 rounded-lg transition-all duration-300 relative overflow-hidden group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t("addToCart")}</span>
              <motion.div
                className="absolute inset-0 bg-nike-volt"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.();
              }}
              className="px-4 bg-nike-gray-800/80 backdrop-blur-sm text-nike-white font-bold py-3 rounded-lg transition-all duration-300 hover:bg-nike-gray-700/80"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("view")}
            </motion.button>
          </motion.div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-nike-white mb-3 group-hover:text-nike-orange transition-colors duration-300">
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
            <div className="flex items-center space-x-1 bg-nike-gray-800/50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-nike-gray-300 font-semibold text-sm">
                {product.rating}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            {product.colors.slice(0, 3).map((color: string, i: number) => (
              <motion.div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-nike-gray-600 shadow-lg"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.2, borderColor: "#ff5a00" }}
                transition={{ duration: 0.2 }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-nike-gray-600 bg-nike-gray-700 flex items-center justify-center shadow-lg">
                <span className="text-xs text-nike-gray-400 font-semibold">
                  +{product.colors.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

// Enhanced Products Section
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
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProducts = useMemo(
    () => filterProducts(products),
    [filterProducts, products]
  );

  const hasActiveFilters = useMemo(
    () =>
    searchState.query.trim() !== "" ||
    searchState.category !== "all" ||
    searchState.priceRange[0] !== 0 ||
    searchState.priceRange[1] !== 1000 ||
    searchState.showNewOnly ||
    searchState.selectedColors.length > 0 ||
      searchState.selectedSizes.length > 0,
    [searchState]
  );

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-nike-black via-nike-black to-nike-gray-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-nike-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nike-volt/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-nike-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("latestCollection")}
          </motion.h2>
          <motion.p
            className="text-xl text-nike-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("productsDescription")}
          </motion.p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-nike-orange rounded-full animate-pulse" />
              )}
            </motion.button>
          </div>

          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
            <div className="text-nike-gray-400">
              {t("showing")} <span className="text-nike-white font-semibold">{filteredProducts.length}</span> {t("of")}{" "}
              <span className="text-nike-white font-semibold">{products.length}</span> {t("productsCount")}
            </div>
            {hasActiveFilters && (
              <motion.div
                className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-2 h-2 bg-nike-orange rounded-full animate-pulse" />
                <span className="text-nike-orange text-sm font-medium">
                  {t("filtersActive")}
                </span>
              </motion.div>
            )}
          </div>

          {hasActiveFilters && (
            <motion.div
              className="mt-4 p-4 bg-nike-gray-800/50 backdrop-blur-sm rounded-xl border border-nike-gray-700/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-nike-gray-400">{t("activeFilters")}:</span>
                {searchState.category !== "all" && (
                  <motion.span
                    className="px-3 py-1 bg-nike-orange/20 text-nike-orange rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {searchState.category}
                  </motion.span>
                )}
                {(searchState.priceRange[0] !== 0 ||
                  searchState.priceRange[1] !== 1000) && (
                  <motion.span
                    className="px-3 py-1 bg-nike-orange/20 text-nike-orange rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ${searchState.priceRange[0]}-${searchState.priceRange[1]}
                  </motion.span>
                )}
                {searchState.showNewOnly && (
                  <motion.span
                    className="px-3 py-1 bg-nike-orange/20 text-nike-orange rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {t("new")} {t("only")}
                  </motion.span>
                )}
                {searchState.selectedColors.length > 0 && (
                  <motion.span
                    className="px-3 py-1 bg-nike-orange/20 text-nike-orange rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {searchState.selectedColors.length} colors
                  </motion.span>
                )}
                {searchState.selectedSizes.length > 0 && (
                  <motion.span
                    className="px-3 py-1 bg-nike-orange/20 text-nike-orange rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {searchState.selectedSizes.length} sizes
                  </motion.span>
                )}
                <motion.button
                  onClick={clearFilters}
                  className="px-3 py-1 bg-nike-gray-700 text-nike-gray-300 rounded-full hover:bg-nike-gray-600 transition-colors text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("clearAll")}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

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
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-nike-white mb-4">
              {t("noProductsFound")}
            </h3>
            <p className="text-nike-gray-400 mb-8 text-lg">
              {t("tryAdjusting")}
            </p>
            <motion.button
              onClick={clearFilters}
              className="px-8 py-4 bg-nike-orange text-nike-white rounded-full hover:bg-nike-orange/90 transition-colors font-bold text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("clearAllFilters")}
            </motion.button>
          </motion.div>
        )}
      </div>

      <ProductFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        products={products}
      />

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

// Enhanced Innovation Section
const InnovationSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const innovations = useMemo(
    () => [
            {
              icon: Zap,
              title: t("airTechnology"),
              description: t("airTechnologyDesc"),
              gradient: "from-nike-orange to-red-600",
        delay: 0,
            },
            {
              icon: Globe,
              title: t("sustainability"),
              description: t("sustainabilityDesc"),
              gradient: "from-nike-volt to-teal-600",
        delay: 0.2,
            },
            {
              icon: Users,
              title: t("athleteInsights"),
              description: t("athleteInsightsDesc"),
              gradient: "from-purple-500 to-pink-600",
        delay: 0.4,
      },
    ],
    [t]
  );

  return (
    <section
      id="innovation"
      className="relative py-24 bg-gradient-to-b from-nike-gray-900 via-nike-black to-nike-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-nike-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-nike-volt/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-nike-white mb-4">
            {t("innovationTitle")}
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            {t("innovationDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {innovations.map((item, index) => (
            <motion.div
              key={index}
              className="group text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: item.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`bg-gradient-to-br ${item.gradient} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-nike-orange/50 transition-all duration-500`}
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-nike-white mb-4 group-hover:text-nike-orange transition-colors duration-300">
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
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-nike-white mb-6">
                {t("futureOfPerformance")}{" "}
                <span className="bg-gradient-to-r from-nike-orange to-nike-volt bg-clip-text text-transparent">
                  {t("athleticPerformance")}
                </span>
              </h3>
              <p className="text-nike-gray-400 text-lg leading-relaxed mb-8">
                {t("futureDesc")}
              </p>
              <motion.button
                className="bg-nike-volt hover:bg-nike-volt/90 text-nike-black font-bold px-8 py-4 rounded-full transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{t("exploreInnovation")}</span>
                <motion.div
                  className="absolute inset-0 bg-nike-orange"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Nike Innovation"
                className="rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Athletes Section
const AthletesSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section
      id="athletes"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-nike-black via-nike-gray-900 to-nike-gray-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-nike-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-nike-white mb-4">
            {t("athletesCommunity")}{" "}
            <span className="bg-gradient-to-r from-nike-orange to-nike-volt bg-clip-text text-transparent">
              {t("community")}
            </span>
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            {t("athletesDescription")}
          </p>
        </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {athletes.map((athlete, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-nike-orange/50 transition-all duration-500 hover:shadow-2xl hover:shadow-nike-orange/20 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <motion.img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
    </section>
  );
};

// Enhanced About Section
const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = useMemo(
    () => [
      { value: "50+", label: t("yearsOfInnovation"), color: "text-nike-orange" },
      { value: "190+", label: t("countriesWorldwide"), color: "text-nike-volt" },
      { value: "75,000+", label: t("globalEmployees"), color: "text-nike-white" },
    ],
    [t]
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-nike-gray-900 via-nike-black to-nike-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-black text-nike-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("aboutNike")}{" "}
              <span className="bg-gradient-to-r from-nike-orange to-nike-volt bg-clip-text text-transparent">
                NIKE
              </span>
            </motion.h2>
            <div className="space-y-6 text-nike-gray-400 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t("aboutNikeDesc1")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t("aboutNikeDesc2")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {t("aboutNikeDesc3")}
              </motion.p>
            </div>
            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>
                    {stat.value}
              </div>
                  <div className="text-nike-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop"
              alt="Nike Heritage"
              className="rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 bg-nike-orange text-nike-white p-6 rounded-2xl shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.8,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <div className="text-2xl font-black">"{t("justDoIt")}"</div>
              <div className="text-sm opacity-90">Since 1988</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Contact Section
const ContactSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t, isRTL } = useLanguage();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-nike-black via-nike-gray-900 to-nike-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-nike-volt/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-nike-white mb-4">
            {t("getInTouch")}{" "}
            <span className="bg-gradient-to-r from-nike-orange to-nike-volt bg-clip-text text-transparent">
              {t("touch")}
            </span>
          </h2>
          <p className="text-xl text-nike-gray-400 max-w-3xl mx-auto">
            {t("contactDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-nike-orange/50 transition-all duration-500 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-nike-orange/20 rounded-xl mr-4">
                <MapPin className="w-6 h-6 text-nike-orange" />
              </div>
              <h3 className="text-2xl font-bold text-nike-white">{t("findStore")}</h3>
            </div>
            <p className="text-nike-gray-400 mb-6">
              {t("findStoreDesc")}
            </p>
            <div className="bg-nike-gray-800/50 rounded-2xl h-64 flex items-center justify-center mb-6 border border-nike-gray-700/50">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-nike-orange mx-auto mb-4" />
                <p className="text-nike-gray-400">{t("interactiveStoreMap")}</p>
              </div>
            </div>
            <motion.button
              className="w-full bg-nike-orange hover:bg-nike-orange/90 text-nike-white font-bold py-4 rounded-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t("findStoresNearYou")}</span>
              <motion.div
                className="absolute inset-0 bg-nike-volt"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-nike-volt/50 transition-all duration-500 shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-nike-volt/20 rounded-xl mr-4">
                <Mail className="w-6 h-6 text-nike-volt" />
              </div>
              <h3 className="text-2xl font-bold text-nike-white">{t("stayConnected")}</h3>
            </div>
            <p className="text-nike-gray-400 mb-6">
              {t("stayConnectedDesc")}
            </p>

            <form className="space-y-4 mb-8">
              <div>
                <input
                  type="email"
                  placeholder={t("enterEmail")}
                  className={`w-full bg-nike-gray-800/50 text-nike-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nike-orange transition-all border border-nike-gray-700/50 focus:border-nike-orange backdrop-blur-sm ${isRTL ? "text-right" : "text-left"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-nike-volt hover:bg-nike-volt/90 text-nike-black font-bold py-4 rounded-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{t("subscribeNow")}</span>
                <motion.div
                  className="absolute inset-0 bg-nike-orange"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>

            <div className="space-y-4">
              <div className="flex items-center text-nike-gray-400 hover:text-nike-white transition-colors">
                <Phone className="w-5 h-5 mr-3 text-nike-orange" />
                <span>1-800-NIKE-1 (1-800-654-3435)</span>
              </div>
              <div className="flex items-center text-nike-gray-400 hover:text-nike-white transition-colors">
                <Mail className="w-5 h-5 mr-3 text-nike-volt" />
                <span>support@nike.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Back to Top Button Component
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed ${isRTL ? "left-6" : "right-6"} bottom-6 z-50 p-4 bg-nike-orange hover:bg-nike-orange/90 text-nike-white rounded-full shadow-2xl transition-all duration-300 group`}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      title={t("backToTop")}
    >
      <ArrowUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-300" />
      <motion.div
        className="absolute inset-0 rounded-full bg-nike-volt opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};

// Enhanced Footer Component
const Footer: React.FC = () => {
  const { t } = useLanguage();
  const footerLinks = useMemo(
    () => ({
      products: ["Shoes", "Clothing", "Accessories", "Equipment"],
      sports: ["Running", "Basketball", "Football", "Training"],
      support: ["Customer Service", "Size Guide", "Returns", "Shipping"],
    }),
    []
  );

  const socialLinks = useMemo(
    () => [
      { icon: Instagram, href: "#" },
      { icon: Twitter, href: "#" },
      { icon: Facebook, href: "#" },
      { icon: Youtube, href: "#" },
    ],
    []
  );

  return (
    <footer className="relative bg-nike-black py-16 border-t border-nike-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <motion.div
              className="text-3xl font-black text-nike-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              NIKE
            </motion.div>
            <p className="text-nike-gray-400 mb-6 leading-relaxed">
              {t("footerDescription")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
              <motion.a
                  key={index}
                  href={social.href}
                  className="text-nike-gray-400 hover:text-nike-orange transition-colors p-2 rounded-lg hover:bg-nike-gray-800/50"
                  whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                  <social.icon className="w-5 h-5" />
              </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-nike-white mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300"
                  >
                    {link}
                </a>
              </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-nike-white mb-4">Sports</h4>
            <ul className="space-y-3">
              {footerLinks.sports.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300"
                  >
                    {link}
                </a>
              </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-nike-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-nike-gray-400 hover:text-nike-white transition-colors duration-300"
                  >
                    {link}
                </a>
              </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-nike-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-nike-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Nike, Inc. {t("allRightsReserved")}
          </div>
          <div className="text-nike-gray-500 text-xs">
            {t("developedBy")}{" "}
            <span className="text-nike-orange font-semibold">Fusion Mind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// App Content Component (needs theme context)
const AppContent: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-nike-black' : 'bg-white'} text-nike-white overflow-x-hidden transition-colors duration-300 min-h-screen`}>
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

      <ShoppingCart />
      <BackToTop />
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <SearchProvider>
            <AppContent />
          </SearchProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
