/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "nike-orange": "#ff5a00",
        "nike-volt": "#00ff85",
        "nike-black": "#000000",
        "nike-white": "#ffffff",
        "nike-gray": {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        nike: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-in-left": "slideInLeft 0.8s ease-out",
        "slide-in-right": "slideInRight 0.8s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 90, 0, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 90, 0, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "nike-gradient": "linear-gradient(135deg, #ff5a00 0%, #ff8c00 100%)",
        "volt-gradient": "linear-gradient(135deg, #00ff85 0%, #00cc6a 100%)",
      },
      boxShadow: {
        "nike-glow": "0 0 30px rgba(255, 90, 0, 0.3)",
        "volt-glow": "0 0 30px rgba(0, 255, 133, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
        "glass-inset": "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "glass-light": "0 8px 32px rgba(0, 0, 0, 0.05)",
        "glass-inset-light": "inset 0 1px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
