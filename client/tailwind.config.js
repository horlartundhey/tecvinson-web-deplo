// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust to your source folder structure
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}", // Add shadcn/ui components
  ],
  theme: {
    extend: {
      colors: {
        'brandbackground': "#FAFAFA",
        'brandprimary': '#0C8CE9'
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.8)', // Neon blue glow
      },
    },
  },
  plugins: [],
};
