import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        ivory: {
          "primary": "#021127ff",
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
