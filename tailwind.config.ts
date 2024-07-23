import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');


export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'layout-default': '#09090b',
        'text-default': '#d4d4d8',
        'accent': '#ff6b6b',
      },
    },
  },
  plugins: [],
} satisfies Config;
