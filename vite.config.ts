import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to inject theme-specific favicon
function faviconPlugin(theme: string): Plugin {
  const favicon = theme === 'schwaelmer'
    ? '/images/favicon_schwaelmer.png'
    : '/images/favicon_synthwave.png';

  return {
    name: 'favicon-plugin',
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        `<link rel="icon" type="image/png" href="${favicon}">\n</head>`
      );
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const viteTheme = (process.env.VITE_THEME || 'synthwave').trim();
    console.log('Building with VITE_THEME:', viteTheme);

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), faviconPlugin(viteTheme)],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
        'process.env.FORMSPREE_ENDPOINT': JSON.stringify((env.FORMSPREE_ENDPOINT || process.env.FORMSPREE_ENDPOINT || '').trim()),
        '__VITE_THEME__': JSON.stringify(viteTheme)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
