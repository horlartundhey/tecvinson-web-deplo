import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr';

import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),  
    svgrPlugin()
  ],
  optimizeDeps: {
    include: ["framer-motion"],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
