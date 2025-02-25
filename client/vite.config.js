import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
  ],
  server: {
    historyApiFallback: true, // Ensures correct routing
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
