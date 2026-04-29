import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@test': '/src/test',
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
