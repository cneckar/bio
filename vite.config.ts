import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'docs',
    copyPublicDir: true,
  },
  publicDir: 'public',
  server: {
    // Serve static files from public directory
    fs: {
      allow: ['..']
    }
  }
});
