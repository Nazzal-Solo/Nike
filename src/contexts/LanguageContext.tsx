import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    innovation: "Innovation",
    athletes: "Athletes",
    about: "About",
    contact: "Contact",
    
    // Hero
    justDoIt: "JUST DO IT",
    heroDescription: "Unleash your potential with Nike's revolutionary athletic gear.",
    heroSubDescription: "Performance meets style in every step.",
    shopNow: "SHOP NOW",
    scroll: "Scroll",
    
    // Products
    latestCollection: "LATEST COLLECTION",
    productsDescription: "Discover our newest innovations in athletic footwear, apparel, and equipment designed for peak performance.",
    showing: "Showing",
    of: "of",
    productsCount: "products",
    filtersActive: "Filters Active",
    activeFilters: "Active filters",
    clearAll: "Clear All",
    noProductsFound: "No products found",
    tryAdjusting: "Try adjusting your filters or search terms.",
    clearAllFilters: "Clear All Filters",
    
    // Innovation
    innovationTitle: "INNOVATION",
    innovationDescription: "Pushing the boundaries of athletic performance through cutting-edge technology and sustainable design.",
    airTechnology: "AIR TECHNOLOGY",
    airTechnologyDesc: "Revolutionary air cushioning system providing maximum comfort and energy return with every step.",
    sustainability: "SUSTAINABILITY",
    sustainabilityDesc: "Committed to creating products with recycled materials and reducing our environmental impact.",
    athleteInsights: "ATHLETE INSIGHTS",
    athleteInsightsDesc: "Designed with input from world-class athletes to meet the demands of elite performance.",
    futureOfPerformance: "THE FUTURE OF",
    athleticPerformance: "ATHLETIC PERFORMANCE",
    futureDesc: "Nike continues to push boundaries with breakthrough innovations in materials science, biomechanics, and digital integration. From adaptive fit technology to sustainable manufacturing processes, we're creating the next generation of athletic gear.",
    exploreInnovation: "EXPLORE INNOVATION",
    
    // Athletes
    athletesCommunity: "ATHLETES &",
    community: "COMMUNITY",
    athletesDescription: "Inspiring greatness through partnerships with world-class athletes who push the limits of human potential.",
    
    // About
    aboutNike: "ABOUT",
    aboutNikeDesc1: "Since 1971, Nike has been inspiring athletes around the world with innovative design, breakthrough technology, and a relentless pursuit of excellence. What started as a revolutionary running shoe company has evolved into the world's leading sports brand.",
    aboutNikeDesc2: "Our mission is simple: to bring inspiration and innovation to every athlete in the world. If you have a body, you are an athlete. We believe in the power of sport to move the world forward.",
    aboutNikeDesc3: "From iconic Air technology to sustainable materials, Nike continues to push boundaries and create products that help athletes of all levels achieve their potential.",
    yearsOfInnovation: "Years of Innovation",
    countriesWorldwide: "Countries Worldwide",
    globalEmployees: "Global Employees",
    
    // Contact
    getInTouch: "GET IN",
    touch: "TOUCH",
    contactDescription: "Find your nearest Nike store or connect with us to stay updated on the latest releases and innovations.",
    findStore: "Find a Store",
    findStoreDesc: "Locate your nearest Nike store and discover our latest collections in person.",
    interactiveStoreMap: "Interactive Store Map",
    findStoresNearYou: "FIND STORES NEAR YOU",
    stayConnected: "Stay Connected",
    stayConnectedDesc: "Subscribe to our newsletter for exclusive offers, new releases, and athletic inspiration.",
    enterEmail: "Enter your email",
    subscribeNow: "SUBSCRIBE NOW",
    
    // Footer
    footerDescription: "Bringing inspiration and innovation to every athlete in the world.",
    developedBy: "Developed by",
    allRightsReserved: "All Rights Reserved.",
    
    // Common
    new: "NEW",
    only: "Only",
    addToCart: "ADD TO CART",
    view: "VIEW",
    backToTop: "Back to Top",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    innovation: "الابتكار",
    athletes: "الرياضيون",
    about: "من نحن",
    contact: "اتصل بنا",
    
    // Hero
    justDoIt: "فقط افعلها",
    heroDescription: "أطلق العنان لإمكانياتك مع معدات نايك الرياضية الثورية.",
    heroSubDescription: "الأداء يلتقي بالأناقة في كل خطوة.",
    shopNow: "تسوق الآن",
    scroll: "انتقل",
    
    // Products
    latestCollection: "المجموعة الأحدث",
    productsDescription: "اكتشف أحدث ابتكاراتنا في الأحذية الرياضية والملابس والمعدات المصممة لأداء ذروة الأداء.",
    showing: "عرض",
    of: "من",
    productsCount: "منتج",
    filtersActive: "المرشحات نشطة",
    activeFilters: "المرشحات النشطة",
    clearAll: "مسح الكل",
    noProductsFound: "لم يتم العثور على منتجات",
    tryAdjusting: "حاول تعديل المرشحات أو مصطلحات البحث.",
    clearAllFilters: "مسح جميع المرشحات",
    
    // Innovation
    innovationTitle: "الابتكار",
    innovationDescription: "دفع حدود الأداء الرياضي من خلال التكنولوجيا المتطورة والتصميم المستدام.",
    airTechnology: "تقنية الهواء",
    airTechnologyDesc: "نظام وسادة هوائية ثوري يوفر أقصى راحة وعودة للطاقة مع كل خطوة.",
    sustainability: "الاستدامة",
    sustainabilityDesc: "ملتزمون بإنشاء منتجات من المواد المعاد تدويرها وتقليل تأثيرنا البيئي.",
    athleteInsights: "رؤى الرياضيين",
    athleteInsightsDesc: "مصممة مع مدخلات من الرياضيين من الطراز العالمي لتلبية متطلبات الأداء النخبوي.",
    futureOfPerformance: "مستقبل",
    athleticPerformance: "الأداء الرياضي",
    futureDesc: "تواصل نايك دفع الحدود مع الابتكارات الرائدة في علوم المواد والبيوميكانيكا والتكامل الرقمي. من تقنية الملاءمة التكيفية إلى عمليات التصنيع المستدامة، نحن ننشئ الجيل القادم من المعدات الرياضية.",
    exploreInnovation: "استكشف الابتكار",
    
    // Athletes
    athletesCommunity: "الرياضيون و",
    community: "المجتمع",
    athletesDescription: "إلهام العظمة من خلال الشراكات مع الرياضيين من الطراز العالمي الذين يدفعون حدود الإمكانات البشرية.",
    
    // About
    aboutNike: "من نحن",
    aboutNikeDesc1: "منذ عام 1971، كانت نايك تلهم الرياضيين حول العالم بتصميم مبتكر وتكنولوجيا رائدة وسعي لا يعرف الكلل نحو التميز. ما بدأ كشركة أحذية جري ثورية تطورت إلى العلامة التجارية الرياضية الرائدة في العالم.",
    aboutNikeDesc2: "مهمتنا بسيطة: جلب الإلهام والابتكار لكل رياضي في العالم. إذا كان لديك جسد، فأنت رياضي. نؤمن بقوة الرياضة لتحريك العالم إلى الأمام.",
    aboutNikeDesc3: "من تقنية الهواء الأيقونية إلى المواد المستدامة، تواصل نايك دفع الحدود وإنشاء منتجات تساعد الرياضيين من جميع المستويات على تحقيق إمكاناتهم.",
    yearsOfInnovation: "سنة من الابتكار",
    countriesWorldwide: "دولة حول العالم",
    globalEmployees: "موظف عالمي",
    
    // Contact
    getInTouch: "تواصل",
    touch: "معنا",
    contactDescription: "ابحث عن متجر نايك الأقرب إليك أو تواصل معنا للبقاء على اطلاع بأحدث الإصدارات والابتكارات.",
    findStore: "ابحث عن متجر",
    findStoreDesc: "حدد موقع متجر نايك الأقرب إليك واكتشف مجموعاتنا الأحدث شخصيًا.",
    interactiveStoreMap: "خريطة المتجر التفاعلية",
    findStoresNearYou: "ابحث عن المتاجر القريبة منك",
    stayConnected: "ابق على اتصال",
    stayConnectedDesc: "اشترك في نشرتنا الإخبارية للحصول على عروض حصرية وإصدارات جديدة وإلهام رياضي.",
    enterEmail: "أدخل بريدك الإلكتروني",
    subscribeNow: "اشترك الآن",
    
    // Footer
    footerDescription: "جلب الإلهام والابتكار لكل رياضي في العالم.",
    developedBy: "تم التطوير بواسطة",
    allRightsReserved: "جميع الحقوق محفوظة.",
    
    // Common
    new: "جديد",
    only: "فقط",
    addToCart: "أضف إلى السلة",
    view: "عرض",
    backToTop: "العودة إلى الأعلى",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("nike-language");
    return (saved === "ar" || saved === "en") ? saved : "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    // Apply RTL to document
    if (isRTL) {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    }
    
    // Save language preference
    localStorage.setItem("nike-language", language);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, isRTL, toggleLanguage, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

