import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        homeEmphasizedText: "#0083CD",
        homeGradientStart: "rgba(66,57,169,.5)",
        darkBlue: "#080C14", 
        lightBlue: "#0C121E", 
        aboutUsOfficersBg: "#00071c"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "loading-dots": {
          "0%, 20%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-4px)",
          },
          "80%, 100%": {
            transform: "translateY(0)",
          },
        },
        "flyInFromTop": {
          '0%': { transform: 'translateY(-1000px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        "flyInFromBottom": {
          '0%': { transform: 'translateY(1000px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        "flyInFromLeft": {
          '0%': { transform: 'translateX(-1000px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        "flyInFromRight": {
          '0%': { transform: 'translateX(1000px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        "flyInFromTopLeft": {
          '0%': { transform: 'translateX(-1000px) translateY(-200px)' },
          '100%': { transform: 'translateX(0px) translateY(0px)' },
        },
        "fadeIn":{
          '0%':{opacity:"0"},
          "100%":{opacity:"100"}
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loading-dot": "loading-dots 1s infinite ease-in-out",
        "flyTop": 'flyInFromBottom 0.55s',
        "flyBottom": 'flyInFromTop 0.55s',
        "flyRight": 'flyInFromLeft 0.55s',
        "flyLeft": 'flyInFromRight 0.55s',
        "flyTopLeft": "flyInFromTopLeft 0.75s",
        "fade":"fadeIn 0.5s"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config