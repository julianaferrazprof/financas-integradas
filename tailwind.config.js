/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        senai: {
          blue: "#005baa",
          dark: "#0a2540",
          light: "#e6f0fa",
          accent: "#2563eb",
          emerald: "#10b981",
        }
      }
    },
  },
  plugins: [],
}
