import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const env = loadEnv(mode, __dirname, '');
  const apiUrl = env.VITE_API_URL;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      proxy: isDev
        ? {
            '/api': {
              target: apiUrl,
              changeOrigin: true,
              secure: false,
            },
          }
        : {},
    },
  };
});
