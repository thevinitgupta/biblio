import type { Config } from "tailwindcss";
const typography = require('@tailwindcss/typography')
const tailwind_theme = require('tailwindcss/defaultTheme')
const plugin = require("tailwindcss/plugin");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      colors: {
        primary: "var(--primary)", // Set your CSS variable for primary color
        orange: {
          400: "#f97316", // Orange gradient for background glow.
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          
      },
      fontFamily: {
        poppins: ['Poppins', ...tailwind_theme.fontFamily.sans],
        victor: ['Victor Mono', ...tailwind_theme.fontFamily.mono],
        // or name them
        // 'victor-mono': ['Victor Mono'],
        // poppins: ['Poppins'],
      },
      keyframes : {
        'border-spin' : {
          '100%' : {
            transform : 'rotate(-360deg)'
          },
        },
      },
      animation: {
        'border-spin' : 'border-spin 7s linear infinite'
      }
    },
  },
  daisyui: {
    themes: [
      {
        ivory: {
          "primary": "#021127ff",
          "light-primary": "#021127f1f",
          "--primary": "#021127ff",
          "--primary/65": "#021127ff65",
          "secondary": "#3f3727ff",
          "accent": "#e2aa28ff",
          "neutral": "#343434",
          "base-100": "#fffcff",
          "info": "#00bfb2",
          "success": "#80f153",
          "warning": "#f89b00",
          "error": "#ff5b7b",
          "card-100": "#021127ff",
        },
        noir: {
          "primary": "#fffcff",
          "light-primary": "#fffcff40",
          "--primary": "#fffcff",
          "--primary/65": "#fffcff65",
          "secondary": "#3f3727ff",
          "accent": "#e2aa28ff",
          "neutral": "#343434",
          "base-100": "#021127ff",
          "info": "#00bfb2",
          "success": "#80f153",
          "warning": "#f89b00",
          "error": "#ff5b7b",
          "card-100": "#021127ff",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
    plugin(function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".bg-noise": {
          backgroundImage: "url('/noise.png')",
          backgroundSize: "300px 300px",
          opacity: "0.7",
        },
        ".bg-squares": {
          backgroundImage: "url('/squares.png')",
          backgroundSize: "300px 300px",
          opacity: "0.4",
        },
        ".bg-lines": {
          backgroundImage: "url('/lines.png')",
          backgroundSize: "100px 100px",
          opacity: "0.6",
        },
        ".text-shadow-inner": {
          textShadow: "inset 2px 2px 4px rgba(255, 255, 255, 1)", // Adjust values as needed
        },
      });
    }),
    

  ],
};
export default config;
