import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), tailwindcss()],
  ssr: {
    noExternal: ['zustand', 'better-auth'],
    external: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@api': '/src/api',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@providers': '/src/providers',
      '@utils': '/src/utils',
      '@style': '/src/style',
      '@routes': '/src/routes',
      '@store': '/src/store',
      '@types': '/src/types',
      '@locales': '/src/locales',
      '@pages': '/src/pages',
      '@lib': '/src/lib',
    },
  },
});
