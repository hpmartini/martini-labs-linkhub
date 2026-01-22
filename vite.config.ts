import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const viteTheme = (process.env.VITE_THEME || 'synthwave').trim();
    console.log('Building with VITE_THEME:', viteTheme);

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
        'process.env.FORMSPREE_ENDPOINT': JSON.stringify(env.FORMSPREE_ENDPOINT || process.env.FORMSPREE_ENDPOINT),
        '__VITE_THEME__': JSON.stringify(viteTheme)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
