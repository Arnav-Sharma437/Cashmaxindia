/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2B3F6C',      // New navy blue
          secondary: '#203156',    // Navy hover
          accent: '#0E6B36',       // Green accent
          neutralDark: '#1A1A2E',  // Dark navy/charcoal for text
          neutralLight: '#F5F7FA', // Light grey for sections
        }
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
