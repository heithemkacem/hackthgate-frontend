/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#1a232e",
        "bg-light": "#f5f5f5",

        "primary-light-400": "#fff",
        "primary-dark-400": "#1a232e",

        "secondary-400": "#00927a",
        // 0aa359
      },
    },
  },
  plugins: [],
};
