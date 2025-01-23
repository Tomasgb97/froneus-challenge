import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/app/components'),
        '@hooks': path.resolve(__dirname, 'src/app/hooks'),
        '@app': path.resolve(__dirname, 'src/app'),
      },
    },
  };
});
