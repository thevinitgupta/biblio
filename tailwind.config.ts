import type { Config } from "tailwindcss";
const typography = require('@tailwindcss/typography')
const tailwind_theme = require('tailwindcss/defaultTheme')

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
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
};
export default config;
