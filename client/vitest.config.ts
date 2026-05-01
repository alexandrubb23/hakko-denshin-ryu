import react from '@vitejs/plugin-react';
import path from 'node:path';
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
      '@hakko/core': path.resolve(__dirname, '../core/src'),
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
      '@constants': '/src/constants',
    },
  },
});
