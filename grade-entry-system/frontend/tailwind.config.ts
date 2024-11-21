import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      AlfaSlabOne: ['Alfa Slab One', 'serif']
    },
    extend: {
      colors: {
        main: "#FFF1D6",
        sub: "#80573B"
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
