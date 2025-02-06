/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#eaeff4",
          100: "#d4e0e9",
          200: "#7ea1bd",
          300: "#5381a7",
          400: "#3e729c",
          500: "#286291",
          600: "#204e74",
          700: "#183b57",
          800: "#0c1d2b",
          900: "#08141d",
        },
        secondary: "#5e1916",
        textColor: "#1c1d1d",
      },
      fontFamily: {
        nunito: ["Nunito"],
        poppins: ["Poppins"],
        "nunito-bold": ["Nunito-Bold"],
        "poppins-bold": ["Poppins-Bold"],
        "nunito-extra-bold": ["Nunito-Extrabold"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
