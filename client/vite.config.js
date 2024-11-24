import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["framer-motion"], // Pre-bundle the dependency
  },  
  resolve: {
    alias: {
      '@': '/src', // Allows absolute imports from "src"
    },
  },
  
})
