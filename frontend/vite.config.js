import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/sokoni-api': {
        target: 'http://localhost:2070',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    }
  }
});
