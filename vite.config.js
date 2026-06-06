import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Backend port
        changeOrigin: true,
        secure: false,
        // Kabhi kabhi '/api' path strip karna padta hai
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});